// src/components/ResultModal.js

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import { shareScore } from '../utils/socialSharing';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.small};
  right: ${({ theme }) => theme.spacing.small};
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme, isCorrect }) => (isCorrect ? theme.colors.success : theme.colors.error)};
`;

const ScoreText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.text};
`;

const TotalScoreText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const CorrectAnswerText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const AchievementsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.achievementBackground};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const AchievementsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.achievementText};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const AchievementItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xSmall};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  &:before {
    content: '🏆';
    margin-right: ${({ theme }) => theme.spacing.xSmall};
  }
`;

const ResultModal = ({
  isCorrect,
  onNextQuestion,
  animationsEnabled,
  soundsEnabled,
  pointsEarned,
  totalPoints,
  achievements,
  correctAnswer,
}) => {
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.5 });

  useEffect(() => {
    if (soundsEnabled) {
      if (isCorrect) {
        playCorrect();
      } else {
        playIncorrect();
      }
    }
  }, [isCorrect, soundsEnabled, playCorrect, playIncorrect]);

  const handleShare = () => {
    shareScore(totalPoints);
  };

  console.log('ResultModal props:', { isCorrect, correctAnswer, pointsEarned, totalPoints });

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isCorrect && animationsEnabled && <Confetti />}
      <ModalContent
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <CloseButton onClick={onNextQuestion}>&times;</CloseButton>
        <Title isCorrect={isCorrect}>{isCorrect ? 'Correct!' : 'Incorrect'}</Title>
        {isCorrect ? (
          <>
            <ScoreText>You&apos;ve gained {pointsEarned} points</ScoreText>
            <TotalScoreText>Total points: {totalPoints}</TotalScoreText>
          </>
        ) : (
          <>
            {correctAnswer ? (
              <CorrectAnswerText>
                The correct answer was: {correctAnswer}
              </CorrectAnswerText>
            ) : (
              <CorrectAnswerText>
                The correct answer was not available.
              </CorrectAnswerText>
            )}
          </>
        )}
        {achievements && achievements.length > 0 && (
          <AchievementsContainer>
            <AchievementsTitle>Achievements Unlocked:</AchievementsTitle>
            <AchievementsList>
              {achievements.map((achievement, index) => (
                <AchievementItem key={index}>{achievement.title}</AchievementItem>
              ))}
            </AchievementsList>
          </AchievementsContainer>
        )}
        <ButtonGroup>
          <Button onClick={onNextQuestion}>Next Question</Button>
          <Button onClick={handleShare}>Share Score</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;