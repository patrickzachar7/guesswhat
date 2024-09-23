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

const InfiniteModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TopSection = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreSection = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
  overflow-y: auto;
`;

const Question = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;

const HintContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.small};
`;

const HintText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xsmall};
  padding: ${({ theme }) => theme.spacing.xsmall};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: left;
  max-width: 80%;
  align-self: flex-start;
`;

const BottomSection = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

const HintButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryHover};
  }
`;

const INITIAL_LIVES = 3;
const QUESTION_TIME = 30; // seconds

function InfiniteMode() {
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

  useEffect(() => {
    if (hintContainerRef.current) {
      hintContainerRef.current.scrollTop = hintContainerRef.current.scrollHeight;
    }
  }, [revealedHints]);

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
    } catch (error) {
      console.error('Error loading question:', error);
      setError(error);
      setIsLoading(false);
    }
  }, []);

  const handleCorrectAnswer = useCallback(() => {
    setIsCorrect(true);
    setCombo((prev) => prev + 1);
    const pointsEarned = 10 + combo * 2;
    setLastPointsEarned(pointsEarned);
    const newCurrency = earnCurrency(pointsEarned);
    setCurrency(newCurrency);
    setTotalQuestionsAnswered((prev) => prev + 1);
    const newAchievements = checkAchievements(totalQuestionsAnswered + 1, combo + 1);
    setAchievements(newAchievements);
  }, [combo, totalQuestionsAnswered]);

  const handleIncorrectAnswer = useCallback(() => {
    setIsCorrect(false);
    setCombo(0);
    setLives((prev) => prev - 1);
    if (lives - 1 <= 0) {
      setIsGameOver(true);
    }
  }, [lives]);

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

  const handleNextQuestion = useCallback(() => {
    setShowResult(false);
    loadNextQuestion();
  }, [loadNextQuestion]);

  const revealNextHint = useCallback(() => {
    if (currentQuestion && hintIndex < currentQuestion.hints.length) {
      setRevealedHints((prev) => [...prev, currentQuestion.hints[hintIndex]]);
      setHintIndex((prev) => prev + 1);
      setTotalHintsUsed((prev) => prev + 1);
      console.log(`Revealed hint ${hintIndex + 1}. Points will decrease.`);
    }
  }, [currentQuestion, hintIndex]);

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

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      handleIncorrectAnswer();
    }
  }, [timeLeft, isGameOver, handleIncorrectAnswer]);

  if (isLoading) {
    return <div>Loading question...</div>;
  }

  if (!currentQuestion) {
    return (
      <div>
        Error loading question. Please try again later. Details:{' '}
        {error ? error.message : 'Unknown error'}
      </div>
    );
  }

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

  return (
    <InfiniteModeContainer>
      <TopSection>
        <Question>Guess the movie:</Question>
        <ScoreBoard currency={currency} lives={lives} combo={combo} />
        <Timer timeLeft={timeLeft} />
      </TopSection>
      <StoreSection>
        <PowerUps
          powerUps={powerUps}
          onUse={usePowerUp}
          onBuy={buyPowerUp}
          currency={currency}
        />
      </StoreSection>
      <ContentWrapper>
        {currentQuestion && !showResult && (
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
        )}
      </ContentWrapper>
      <BottomSection>
        {currentQuestion && !showResult && (
          <>
            {hintIndex < currentQuestion?.hints.length && (
              <HintButton onClick={revealNextHint}>
                Reveal Next Hint (-1 point)
              </HintButton>
            )}
            <InputContainer>
              <GuessInput onSubmit={handleGuess} isInfinite={true} />
            </InputContainer>
          </>
        )}
      </BottomSection>
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
  