import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#1A1A1A', // Darker gray for better text readability
    secondary: '#4F4F4F', 
    background: '#F0F0F0', // Softer light background for reduced eye strain
    text: '#2D2D2D', 
    headerBackground: '#FFFFFF',
    headerBorder: '#D0D0D0', 
    buttonBackground: '#E0E0E0', 
    buttonHover: '#CFCFCF', 
    disabledBackground: '#E8E8E8',
    disabledText: '#A0A0A0',
    success: '#6AAA64', // Wordle-like green for success feedback
    error: '#EB5757',
    warning: '#C9B458', // Wordle-like yellow for warning
    info: '#2F80ED',
    inputBackground: '#F7F7F7', // Slightly lighter to indicate editable areas
    cardBackground: '#FFFFFF',
    border: '#E0E0E0',
    tooltipBackground: 'rgba(0, 0, 0, 0.85)',
    tooltipText: '#FFFFFF',
    correct: '#6AAA64', // Green for correct guesses
    semiCorrect: '#C9B458', // Yellow for partially correct guesses
    incorrect: '#787C7E', // Gray for incorrect guesses
  },
  fonts: {
    main: "'Inter', sans-serif",
  },
  fontSizes: {
    xSmall: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
    xxLarge: '2rem',
  },
  spacing: {
    xSmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xLarge: '2rem',
  },
  borderRadius: '0.5rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

export const darkTheme = {
  colors: {
    primary: '#E0E0E0',
    secondary: '#B3B3B3',
    background: '#1A1A1A',
    text: '#E0E0E0',
    headerBackground: '#1A1A1A',
    headerBorder: '#4F4F4F',
    buttonBackground: '#4F4F4F',
    buttonHover: '#5A5A5A',
    disabledBackground: '#3A3A3A',
    disabledText: '#6A6A6A',
    success: '#6AAA64', 
    error: '#EB5757',
    warning: '#C9B458', 
    info: '#2F80ED',
    inputBackground: '#2A2A2A',
    cardBackground: '#2A2A2A',
    border: '#4F4F4F',
    tooltipBackground: 'rgba(255, 255, 255, 0.85)',
    tooltipText: '#1A1A1A',
    correct: '#6AAA64',
    semiCorrect: '#C9B458',
    incorrect: '#787C7E',
  },
  fonts: {
    main: "'Inter', sans-serif",
  },
  fontSizes: {
    xSmall: '0.75rem',
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xLarge: '1.5rem',
    xxLarge: '2rem',
  },
  spacing: {
    xSmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xLarge: '2rem',
  },
  borderRadius: '0.5rem',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 0;
    padding: 0;
    transition: all 0.3s linear;
  }

  header {
    background-color: ${({ theme }) => theme.colors.headerBackground};
    border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  }

  button {
    font-family: ${({ theme }) => theme.fonts.main};
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.buttonBackground};
    color: ${({ theme }) => theme.colors.text};
    padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: ${({ theme }) => theme.colors.buttonHover};
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.disabledBackground};
    color: ${({ theme }) => theme.colors.disabledText};
    cursor: not-allowed;
  }

  input, textarea {
    font-family: ${({ theme }) => theme.fonts.main};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spacing.small};
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.3s ease;
    width: 100%;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;