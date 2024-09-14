// src/components/Leaderboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getLocalLeaderboard, getGlobalLeaderboard } from '../utils/leaderboard';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const LeaderboardRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundAlt};
  }
`;

const LeaderboardCell = styled.td`
  padding: ${({ theme }) => theme.spacing.small};
  text-align: center;
`;

const LeaderboardToggle = styled.button`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

function Leaderboard() {
  const [isGlobal, setIsGlobal] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = isGlobal ? await getGlobalLeaderboard() : getLocalLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, [isGlobal]);

  return (
    <LeaderboardContainer>
      <h2>Leaderboard</h2>
      <LeaderboardToggle onClick={() => setIsGlobal(!isGlobal)}>
        {isGlobal ? 'Show Local' : 'Show Global'}
      </LeaderboardToggle>
      <LeaderboardTable>
        <thead>
          <LeaderboardRow>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </LeaderboardRow>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <LeaderboardRow key={index}>
              <LeaderboardCell>{index + 1}</LeaderboardCell>
              <LeaderboardCell>{entry.name}</LeaderboardCell>
              <LeaderboardCell>{entry.score}</LeaderboardCell>
            </LeaderboardRow>
          ))}
        </tbody>
      </LeaderboardTable>
    </LeaderboardContainer>
  );
}

export default Leaderboard;