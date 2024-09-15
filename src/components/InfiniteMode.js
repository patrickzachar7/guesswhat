// src/components/InfiniteMode.js

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GuessInput from './GuessInput';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ResultModal from './ResultModal';
import PowerUps from './PowerUps';
import { checkAchievements } from '../utils/achievements';
import {
  earnCurrency,
  spendCurrency,
  getCurrencyBalance,
} from '../utils/currency';
import GameOverModal from './GameOverModal';
import HintButton from './HintButton';

const InfiniteModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SecondaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
`;

const ShopSidePanel = styled.div`
  width: 250px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const HintContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const HintText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const HintButtonStyled = styled(HintButton)`
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const InputContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.headerBorder};
`;

const RoundedInput = styled.div`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  border-radius: 9999px;
  padding: ${({ theme }) => theme.spacing.xSmall}
    ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
`;

const INITIAL_LIVES = 3;
const QUESTION_TIME = 30; // seconds

function InfiniteMode() {
  // State variables
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [revealedHints, setRevealedHints] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [currency, setCurrency] = useState(getCurrencyBalance());
  const [lastPointsEarned, setLastPointsEarned] = useState(0);
  const [powerUps, setPowerUps] = useState({
    extraLife: 0,
    skipQuestion: 0,
  });
  const [error, setError] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const hintContainerRef = useRef(null);

  // Scroll to bottom when new hints are added
  useEffect(() => {
    if (hintContainerRef.current) {
      hintContainerRef.current.scrollTop =
        hintContainerRef.current.scrollHeight;
    }
  }, [revealedHints]);

  // Load next question
  const loadNextQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/random-question');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Loaded question data:', data);

      if (data.gameCompleted) {
        setIsGameOver(true);
        setIsLoading(false);
        return;
      }

      setCurrentQuestion(data);
      setRevealedHints([data.hints[0]]);
      setHintIndex(1);
      setTimeLeft(QUESTION_TIME);
      setIsLoading(false);
      setCorrectAnswer('');
    } catch (error) {
      console.error('Error loading question:', error);
      setError(error);
      setIsLoading(false);
    }
  }, []);

  // Handle correct answer
  const handleCorrectAnswer = useCallback(() => {
    setIsCorrect(true);
    setCombo((prev) => prev + 1);
    const pointsEarned = 10 + combo * 2;
    setLastPointsEarned(pointsEarned);
    const newCurrency = earnCurrency(pointsEarned);
    setCurrency(newCurrency);
    setTotalQuestionsAnswered((prev) => prev + 1);
    const newAchievements = checkAchievements(
      totalQuestionsAnswered + 1,
      combo + 1
    );
    setAchievements(newAchievements);
  }, [combo, totalQuestionsAnswered]);

  // Handle incorrect answer
  const handleIncorrectAnswer = useCallback(() => {
    setIsCorrect(false);
    setCombo(0);
    setLives((prev) => prev - 1);
    if (lives - 1 <= 0) {
      setIsGameOver(true);
    }
  }, [lives]);

  // Handle user's guess
  const handleGuess = useCallback(
    async (guess) => {
      const guessText = typeof guess === 'object' ? guess.title : guess;

      try {
        const response = await fetch('/api/guess-check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            questionId: currentQuestion._id,
            guess: guessText,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Guess check response:', data);

        setCorrectAnswer(data.correctAnswer);

        if (data.correct) {
          handleCorrectAnswer();
        } else {
          handleIncorrectAnswer();
        }
        setShowResult(true);
      } catch (error) {
        console.error('Error submitting guess:', error);
        setError(error);
      }
    },
    [currentQuestion, handleCorrectAnswer, handleIncorrectAnswer]
  );

  // Use power-up
  const usePowerUp = useCallback(
    (powerUp) => {
      if (powerUps[powerUp] > 0) {
        setPowerUps((prev) => ({ ...prev, [powerUp]: prev[powerUp] - 1 }));
        switch (powerUp) {
          case 'extraLife':
            setLives((prev) => prev + 1);
            break;
          case 'skipQuestion':
            loadNextQuestion();
            break;
          default:
            break;
        }
      }
    },
    [powerUps, loadNextQuestion]
  );

  // Buy power-up
  const buyPowerUp = useCallback(
    (powerUp, cost) => {
      if (currency >= cost) {
        if (spendCurrency(cost)) {
          setCurrency((prev) => prev - cost);
          setPowerUps((prev) => ({ ...prev, [powerUp]: prev[powerUp] + 1 }));
        }
      }
    },
    [currency]
  );

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    setShowResult(false);
    loadNextQuestion();
  }, [loadNextQuestion]);

  // Reveal next hint
  const revealNextHint = useCallback(() => {
    if (currentQuestion && hintIndex < currentQuestion.hints.length) {
      setRevealedHints((prev) => [...prev, currentQuestion.hints[hintIndex]]);
      setHintIndex((prev) => prev + 1);
      setTotalHintsUsed((prev) => prev + 1);
      console.log(`Revealed hint ${hintIndex + 1}. Points will decrease.`);
    }
  }, [currentQuestion, hintIndex]);

  // Restart game
  const restartGame = useCallback(() => {
    setCurrency(getCurrencyBalance());
    setLives(INITIAL_LIVES);
    setCombo(0);
    setIsGameOver(false);
    setTotalHintsUsed(0);
    setTotalQuestionsAnswered(0);
    setGameStartTime(Date.now());
    setCorrectAnswer('');
    loadNextQuestion();
  }, [loadNextQuestion]);

  // Load next question on mount
  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver && !showResult) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver && !showResult) {
      handleIncorrectAnswer();
    }
  }, [timeLeft, isGameOver, handleIncorrectAnswer, showResult]);

  // Render loading state
  if (isLoading) {
    return <div>Loading question...</div>;
  }

  // Render error state
  if (!currentQuestion) {
    return (
      <div>
        Error loading question. Please try again later. Details:{' '}
        {error ? error.message : 'Unknown error'}
      </div>
    );
  }

  // Render game over state
  if (isGameOver) {
    return (
      <GameOverModal
        currency={currency}
        onRestart={restartGame}
        achievements={achievements}
        totalHintsUsed={totalHintsUsed}
        totalQuestionsAnswered={totalQuestionsAnswered}
        gameStartTime={gameStartTime}
      />
    );
  }

  // Render the game UI
  return (
    <InfiniteModeContainer>
      {/* Secondary Header */}
      <SecondaryHeader>
        <ScoreBoard currency={currency} lives={lives} combo={combo} />
        <Timer timeLeft={timeLeft} />
      </SecondaryHeader>

      {/* Content Area */}
      <ContentArea>
        {/* Shop Side Panel */}
        <ShopSidePanel>
          <PowerUps
            powerUps={powerUps}
            onUse={usePowerUp}
            onBuy={buyPowerUp}
            currency={currency}
          />
        </ShopSidePanel>

        {/* Main Content */}
        <MainContent>
          {currentQuestion && !showResult && (
            <>
              <HintContainer ref={hintContainerRef}>
                <AnimatePresence>
                  {revealedHints.map((hint, index) => (
                    <HintText
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}. {hint}
                    </HintText>
                  ))}
                </AnimatePresence>
              </HintContainer>
              {hintIndex < currentQuestion.hints.length && (
                <HintButtonStyled onClick={revealNextHint}>
                  Reveal Next Hint (-1 point)
                </HintButtonStyled>
              )}
            </>
          )}
        </MainContent>
      </ContentArea>

      {/* Input Container */}
      <InputContainer>
        <RoundedInput>
          <GuessInput onSubmit={handleGuess} isInfinite={true} />
        </RoundedInput>
      </InputContainer>

      {/* Result Modal */}
      {showResult && (
        <ResultModal
          isCorrect={isCorrect}
          onNextQuestion={handleNextQuestion}
          animationsEnabled={animationsEnabled}
          soundsEnabled={soundsEnabled}
          pointsEarned={lastPointsEarned}
          totalPoints={currency}
          achievements={achievements}
          correctAnswer={correctAnswer}
        />
      )}
    </InfiniteModeContainer>
  );
}

export default InfiniteMode;