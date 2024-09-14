import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import GuessInput from './GuessInput';
import ScoreBoard from './ScoreBoard';
import Timer from './Timer';
import ResultModal from './ResultModal';
import PowerUps from './PowerUps';
import { checkAchievements } from '../utils/achievements';
import { addScore } from '../utils/leaderboard';
import { earnCurrency, spendCurrency, getCurrencyBalance } from '../utils/currency';
import GameOverModal from './GameOverModal';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

const InfiniteModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background || '#f0f0f0'};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PointValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Question = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const HintContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HintText = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  text-align: center;
`;

const HintButton = styled.button`
  padding: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [revealedHints, setRevealedHints] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [score, setScore] = useState(0);
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
  const [powerUps, setPowerUps] = useState({
    extraLife: 0,
    skipQuestion: 0,
  });
  const [error, setError] = useState(null);

  const loadNextQuestion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/random-question');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newQuestion = await response.json();
      console.log('Received question:', newQuestion);
      setCurrentQuestion(newQuestion);
      setRevealedHints([newQuestion.hints[0]]);
      setHintIndex(1);
      setTimeLeft(QUESTION_TIME);
    } catch (error) {
      console.error('Error fetching question:', error);
      setCurrentQuestion(null);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGameOver = useCallback(() => {
    addScore(score);
    setIsGameOver(true);
  }, [score]);

  const handleIncorrectAnswer = useCallback(() => {
    setLives(prevLives => {
      const newLives = prevLives - 1;
      if (newLives <= 0) {
        handleGameOver();
      }
      return newLives;
    });
    setCombo(0);
    setIsCorrect(false);
    setShowResult(true);
  }, [handleGameOver]);

  const calculateCurrentPointValue = useCallback(() => {
    const maxPoints = 10;
    const pointsLostPerHint = 1;
    return Math.max(maxPoints - (hintIndex - 1) * pointsLostPerHint, 1);
  }, [hintIndex]);

  const calculatePoints = useCallback((timeLeft) => {
    const basePoints = calculateCurrentPointValue();
    const timeBonus = Math.floor(timeLeft * 3.33); // Max 100 points time bonus
    const comboMultiplier = 1 + combo * 0.1; // 10% increase per combo
    return Math.floor((basePoints + timeBonus) * comboMultiplier);
  }, [calculateCurrentPointValue, combo]);

  const handleCorrectAnswer = useCallback(() => {
    const pointsEarned = calculatePoints(timeLeft);
    const newScore = score + pointsEarned;
    setScore(newScore);
    setCombo(prevCombo => prevCombo + 1);
  
    // Check for achievements
    const newAchievements = checkAchievements(newScore, combo + 1);
    setAchievements(prevAchievements => [...prevAchievements, ...newAchievements]);
  
    // Earn currency
    const currencyEarned = Math.floor(pointsEarned / 10);
    earnCurrency(currencyEarned);
    setCurrency(getCurrencyBalance());
    
    setIsCorrect(true);
    setShowResult(true);
  }, [calculatePoints, timeLeft, score, combo]);

  const handleGuess = useCallback(async (guess) => {
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
  
      if (data.correct) {
        handleCorrectAnswer();
      } else {
        handleIncorrectAnswer();
      }
    } catch (error) {
      console.error('Error submitting guess:', error);
      setError(error);
    }
  }, [currentQuestion, handleCorrectAnswer, handleIncorrectAnswer]);

  const usePowerUp = useCallback((powerUp) => {
    if (powerUps[powerUp] > 0) {
      setPowerUps(prev => ({ ...prev, [powerUp]: prev[powerUp] - 1 }));
      switch (powerUp) {
        case 'extraLife':
          setLives(prev => prev + 1);
          break;
        case 'skipQuestion':
          loadNextQuestion();
          break;
        default:
          break;
      }
    }
  }, [powerUps, loadNextQuestion]);

  const buyPowerUp = useCallback((powerUp, cost) => {
    if (currency >= cost) {
      spendCurrency(cost);
      setCurrency(getCurrencyBalance());
      setPowerUps(prev => ({ ...prev, [powerUp]: prev[powerUp] + 1 }));
    }
  }, [currency]);

  const handleNextQuestion = useCallback(() => {
    setShowResult(false);
    loadNextQuestion();
  }, [loadNextQuestion]);

  const revealNextHint = useCallback(() => {
    if (currentQuestion && hintIndex < currentQuestion.hints.length) {
      setRevealedHints(prev => [...prev, currentQuestion.hints[hintIndex]]);
      setHintIndex(prev => prev + 1);
    }
  }, [currentQuestion, hintIndex]);

  const restartGame = useCallback(() => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setCombo(0);
    setIsGameOver(false);
    loadNextQuestion();
  }, [loadNextQuestion]);

  useEffect(() => {
    loadNextQuestion();
  }, [loadNextQuestion]);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isGameOver) {
      handleIncorrectAnswer();
    }
  }, [timeLeft, isGameOver, handleIncorrectAnswer]);

  if (isLoading) {
    return <div>Loading question...</div>;
  }

  if (!currentQuestion) {
    return <div>Error loading question. Please try again later. Details: {error ? error.message : 'Unknown error'}</div>;
  }

  if (isGameOver) {
    return (
      <GameOverModal
        score={score}
        onRestart={restartGame}
        achievements={achievements}
      />
    );
  }

  return (
    <InfiniteModeContainer>
      <ScoreBoard score={score} lives={lives} combo={combo} currency={currency} />
      <Timer timeLeft={timeLeft} />
      <ContentWrapper>
        <PointValue>Current base point value: {calculateCurrentPointValue()}</PointValue>
        <PowerUps powerUps={powerUps} onUse={usePowerUp} onBuy={buyPowerUp} currency={currency} />
        {currentQuestion && !showResult && (
          <>
            <Question>Guess the movie:</Question>
            <HintContainer>
              <AnimatePresence>
                {revealedHints.map((hint, index) => (
                  <HintText
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {hint}
                  </HintText>
                ))}
              </AnimatePresence>
            </HintContainer>
            {hintIndex < currentQuestion.hints.length && (
              <HintButton onClick={revealNextHint}>
                Reveal Next Hint (-1 point)
              </HintButton>
            )}
            <GuessInput onSubmit={handleGuess} isInfinite={true} />
          </>
        )}
        {showResult && (
          <ResultModal
            isCorrect={isCorrect}
            onNextQuestion={handleNextQuestion}
            animationsEnabled={animationsEnabled}
            soundsEnabled={soundsEnabled}
            score={score}
            achievements={achievements}
          />
        )}
      </ContentWrapper>
    </InfiniteModeContainer>
  );
}

export default InfiniteMode;