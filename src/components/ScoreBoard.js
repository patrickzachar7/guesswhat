import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHeart } from '@fortawesome/free-solid-svg-icons';

const ScoreBoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ScoreItem = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const LivesContainer = styled.div`
  display: flex;
`;

const LifeIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.small};
`;

function ScoreBoard({ currency, lives, combo }) {
  return (
    <ScoreBoardContainer>
      <ScoreItem>
        <FontAwesomeIcon icon={faCoins} style={{ marginRight: '5px' }} />
        {currency}
      </ScoreItem>
      <LivesContainer>
        {[...Array(lives)].map((_, index) => (
          <LifeIcon key={index}>
            <FontAwesomeIcon icon={faHeart} />
          </LifeIcon>
        ))}
      </LivesContainer>
      <ScoreItem>Combo: x{combo + 1}</ScoreItem>
    </ScoreBoardContainer>
  );
}

export default ScoreBoard;