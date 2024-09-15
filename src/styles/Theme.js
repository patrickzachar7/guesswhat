// src/Theme.js
import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#2D2D2D', // Dark gray for primary text
    secondary: '#4F4F4F', // Medium gray for secondary elements
    background: '#F9F9F9', // Light gray background
    text: '#2D2D2D', // Consistent text color
    headerBackground: '#FFFFFF', // White header to match the light theme
    headerBorder: '#E0E0E0', // Light gray border for header
    buttonBackground: '#E0E0E0', // Light gray button background
    buttonHover: '#D5D5D5', // Slightly darker gray on hover
    disabledBackground: '#E8E8E8',
    disabledText: '#A0A0A0',
    success: '#27AE60', // Green for success messages
    error: '#EB5757', // Red for error messages
    warning: '#F2C94C', // Yellow for warnings
    info: '#2F80ED', // Blue for informational messages
    inputBackground: '#FFFFFF',
    cardBackground: '#FFFFFF',
    border: '#E0E0E0',
  },
  fonts: {
    main: "'Inter', sans-serif",
  },
  fontSizes: {
    xSmall: '0.75rem', // 12px
    small: '0.875rem', // 14px
    medium: '1rem', // 16px
    large: '1.25rem', // 20px
    xLarge: '1.5rem', // 24px
    xxLarge: '2rem', // 32px
  },
  spacing: {
    xSmall: '0.25rem', // 4px
    small: '0.5rem', // 8px
    medium: '1rem', // 16px
    large: '1.5rem', // 24px
    xLarge: '2rem', // 32px
  },
  borderRadius: '0.5rem', // 8px for a subtle rounded feel
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
};

export const darkTheme = {
  colors: {
    primary: '#E0E0E0', // Light gray for primary text
    secondary: '#B3B3B3', // Medium gray for secondary elements
    background: '#1A1A1A', // Dark background
    text: '#E0E0E0', // Light text for readability
    headerBackground: '#2A2A2A', // Dark header to match the dark theme
    headerBorder: '#4F4F4F', // Dark gray border for header
    buttonBackground: '#4F4F4F', // Dark gray button background
    buttonHover: '#5A5A5A', // Slightly lighter gray on hover
    disabledBackground: '#3A3A3A',
    disabledText: '#6A6A6A',
    success: '#27AE60',
    error: '#EB5757',
    warning: '#F2C94C',
    info: '#2F80ED',
    inputBackground: '#2A2A2A',
    cardBackground: '#2A2A2A',
    border: '#4F4F4F',
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