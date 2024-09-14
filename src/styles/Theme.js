// src/Theme.js
import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    secondaryHover: '#5a6268', // Darker shade for hover effect
    hover: '#0056b3', // Darker primary color for hover
    background: '#f8f9fa',
    text: '#212529',
    disabledBackground: '#e2e6ea', // Light grey for disabled buttons
    disabledText: '#adb5bd', // Medium grey for disabled text
    tooltipBackground: 'rgba(0, 0, 0, 0.75)',
    tooltipText: '#ffffff',
    dailyChallenge: '#28a745',
    dailyChallengeHover: '#218838',
    infinite: '#9c27b0',
    infiniteHover: '#7b1fa2',
  },
  fonts: {
    main: "'Roboto', sans-serif",
  },
  fontSizes: {
    xSmall: '0.7rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xLarge: '1.5rem',
  },
  spacing: {
    xSmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
  borderRadius: '0.25rem',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
};

export const darkTheme = {
  colors: {
    primary: '#0056b3',
    secondary: '#495057',
    secondaryHover: '#343a40',
    hover: '#003865',
    background: '#343a40',
    text: '#f8f9fa',
    disabledBackground: '#6c757d',
    disabledText: '#ced4da',
    tooltipBackground: 'rgba(255, 255, 255, 0.85)',
    tooltipText: '#212529',
    danger: '#ff0000',
    success: '#4CAF50',
    error: '#F44336',
    dailyChallenge: '#1e7e34',
    dailyChallengeHover: '#155724',
    infinite: '#ba68c8',
    infiniteHover: '#ab47bc',
  },
  fonts: {
    main: "'Roboto', sans-serif",
  },
  fontSizes: {
    xSmall: '0.7rem',
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xLarge: '1.5rem',
  },
  spacing: {
    xSmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
  borderRadius: '0.25rem',
  boxShadow: '0 0.125rem 0.25rem rgba(255, 255, 255, 0.075)',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 0;
    padding: 0;
  }
`;