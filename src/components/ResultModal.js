import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { shareScore } from '../utils/socialSharing';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });
const useSound = dynamic(() => import('use-sound').then((mod) => mod.default), { ssr: false });

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme, isCorrect }) => isCorrect ? theme.colors.success : theme.colors.error};
`;

const Score = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
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

const ResultModal = ({ score, onRestart, achievements }) => {
  const handleShare = () => {
    shareScore(score);
  };
  right: 0;
  bottom: 0;
  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <Title>Game Over</Title>
        <Score>Your Score: {score}</Score>
        {achievements.length > 0 && (
          <div>
            <h3>Achievements Unlocked:</h3>
            <ul>
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement.title}</li>
              ))}
            </ul>
          </div>
        )}
        <Button onClick={onRestart}>Play Again</Button>
        <Link href="/" passHref>
          <Button as="a">Home</Button>
        </Link>
        <Button onClick={handleShare}>Share Score</Button>
        <Link href="/leaderboard" passHref>
          <Button as="a">View Leaderboard</Button>
        </Link>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ResultModal;