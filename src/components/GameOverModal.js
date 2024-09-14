import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { shareScore } from '../utils/socialSharing';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 500px;
  width: 90%;
`;

const GameOverTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FinalScore = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const AchievementItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  margin-right: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ShareButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryHover};
  }
`;

function GameOverModal({ score, onRestart, achievements }) {
    const handleShare = () => {
        shareScore(score);
    };

    return (
        <ModalOverlay>
          <ModalContent>
            <GameOverTitle>Game Over</GameOverTitle>
            <FinalScore>Final Score: {score}</FinalScore>
            {achievements.length > 0 && (
              <>
                <h3>New Achievements:</h3>
                <AchievementsList>
                  {achievements.map((achievement, index) => (
                    <AchievementItem key={index}>{achievement.title}</AchievementItem>
                  ))}
                </AchievementsList>
              </>
            )}
            <Button onClick={onRestart}>Play Again</Button>
            <Link href="/" passHref>
              <Button as="a">Home</Button>
            </Link>
            <ShareButton onClick={handleShare}>Share Score</ShareButton>
          </ModalContent>
        </ModalOverlay>
    );
}

export default GameOverModal;