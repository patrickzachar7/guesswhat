// src/components/ScoreBoard.js
import React from 'react';
import styled from 'styled-components';

const ScoreBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ScoreItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
`;

const LivesContainer = styled.div`
  display: flex;
`;

const LifeIcon = styled.span`
  color: red;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

function ScoreBoard({ score, lives, combo }) {
  return (
    <ScoreBoardContainer>
      <ScoreItem>Score: {score}</ScoreItem>
      <LivesContainer>
        {[...Array(lives)].map((_, index) => (
          <LifeIcon key={index}>❤️</LifeIcon>
        ))}
      </LivesContainer>
      <ScoreItem>Combo: x{combo + 1}</ScoreItem>
    </ScoreBoardContainer>
  );
}

export default ScoreBoard;