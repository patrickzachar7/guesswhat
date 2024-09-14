// src/components/TestComponent.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const TestContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.large};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const TestTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;

const TestMessage = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.dailyChallenge};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

function TestComponent() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestMessage();
  }, []);

  const fetchTestMessage = async () => {
    try {
      const response = await fetch(`${API_URL}/api/test`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error('Error fetching test message:', err);
      setError(`Unable to fetch test message: ${err.message}`);
    }
  };

  return (
    <TestContainer>
      <TestTitle>Test Component</TestTitle>
      {message && <TestMessage>Server message: {message}</TestMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TestContainer>
  );
}

export default TestComponent;