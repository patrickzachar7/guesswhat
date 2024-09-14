// src/components/Achievements.js
import React from 'react';
import styled from 'styled-components';
import { getAchievements } from '../utils/achievements';

const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.large};
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const AchievementIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: ${({ theme }) => theme.spacing.medium};
`;

const AchievementInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AchievementTitle = styled.h3`
  margin: 0;
`;

const AchievementDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function Achievements() {
  const achievements = getAchievements();

  return (
    <AchievementsContainer>
      <h2>Achievements</h2>
      {achievements.map((achievement) => (
        <AchievementItem key={achievement.id}>
          <AchievementIcon src={achievement.icon} alt={achievement.title} />
          <AchievementInfo>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDescription>{achievement.description}</AchievementDescription>
          </AchievementInfo>
        </AchievementItem>
      ))}
    </AchievementsContainer>
  );
}

export default Achievements;