import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/Theme';
import GlobalStyle from '../styles/globalStyles';
import { ScoreProvider } from '../contexts/ScoreContext';
import { UserProvider } from '../contexts/UserContext';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <UserProvider>
        <ScoreProvider>
          <Header toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
          <Component {...pageProps} />
        </ScoreProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;