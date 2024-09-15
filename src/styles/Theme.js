// src/Theme.js
import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#0D0D0D', // Near black for text
    secondary: '#2563EB', // Blue accent
    secondaryHover: '#1D4ED8', // Darker blue for hover effect
    background: '#FFFFFF', // Pure white background
    text: '#0D0D0D', // Near black for readability
    disabledBackground: '#E5E7EB', // Light gray for disabled buttons
    disabledText: '#9CA3AF', // Medium gray for disabled text
    tooltipBackground: 'rgba(0, 0, 0, 0.85)', // Dark tooltip background
    tooltipText: '#FFFFFF', // White text for tooltips
    success: '#22C55E', // Green for success messages
    error: '#EF4444', // Red for error messages
    warning: '#FBBF24', // Yellow for warnings
    info: '#3B82F6', // Blue for informational messages
    dailyChallenge: '#9333EA', // Purple accent
    dailyChallengeHover: '#7E22CE', // Darker purple
    infinite: '#DB2777', // Pink accent
    infiniteHover: '#BE185D', // Darker pink
    inputBackground: '#F9FAFB', // Slight off-white for inputs
    cardBackground: '#F3F4F6', // Light gray for card backgrounds
    border: '#E5E7EB', // Light gray for borders
  },
  fonts: {
    main: "'Nunito Sans', sans-serif",
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
  borderRadius: '0.75rem', // 12px for a modern rounded feel
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
};

export const darkTheme = {
  colors: {
    primary: '#FFFFFF', // White text on dark background
    secondary: '#3B82F6', // Blue accent
    secondaryHover: '#2563EB', // Darker blue for hover
    background: '#1F2937', // Dark gray background
    text: '#FFFFFF', // White text for readability
    disabledBackground: '#4B5563', // Dark gray for disabled buttons
    disabledText: '#9CA3AF', // Medium gray for disabled text
    tooltipBackground: 'rgba(255, 255, 255, 0.85)', // Light tooltip background
    tooltipText: '#1F2937', // Dark text for tooltips
    success: '#22C55E', // Green for success messages
    error: '#EF4444', // Red for error messages
    warning: '#FBBF24', // Yellow for warnings
    info: '#3B82F6', // Blue for informational messages
    dailyChallenge: '#8B5CF6', // Violet accent
    dailyChallengeHover: '#7C3AED', // Darker violet
    infinite: '#EC4899', // Pink accent
    infiniteHover: '#DB2777', // Darker pink
    inputBackground: '#374151', // Dark gray for inputs
    cardBackground: '#1F2937', // Dark background for cards
    border: '#4B5563', // Dark gray for borders
  },
  fonts: {
    main: "'Nunito Sans', sans-serif",
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
  borderRadius: '0.75rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
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

  button {
    font-family: ${({ theme }) => theme.fonts.main};
    cursor: pointer;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  input, textarea {
    font-family: ${({ theme }) => theme.fonts.main};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: ${({ theme }) => theme.spacing.small};
    background-color: ${({ theme }) => theme.colors.inputBackground};
    color: ${({ theme }) => theme.colors.text};
    transition: border-color 0.3s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;