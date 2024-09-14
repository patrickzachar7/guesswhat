// src/components/Timer.js
import React from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  color: ${({ timeLeft, theme }) => 
    timeLeft <= 5 ? theme.colors.danger : theme.colors.text};
`;

function Timer({ timeLeft }) {
  return (
    <TimerContainer timeLeft={timeLeft}>
      Time: {timeLeft}s
    </TimerContainer>
  );
}

export default Timer;