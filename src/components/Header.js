import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useScore } from '../contexts/ScoreContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.primary};
  color: #FFFFFF;
`;

const Logo = styled.span`
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: bold;
  text-decoration: none;
  color: #FFFFFF;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ScoreDisplay = styled.span`
  font-size: ${props => props.theme.fontSizes.medium};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;
`;

function Header({ toggleDarkMode, isDarkMode }) {
  const { score } = useScore();

  return (
    <HeaderContainer>
      <Logo>Guess What</Logo>
      <Nav>
        <Link href="/" passHref>
          <NavLink>Home</NavLink>
        </Link>
        <Link href="/infinite-mode" passHref>
          <NavLink>Infinite Mode</NavLink>
        </Link>
        <Link href="/leaderboard" passHref>
          <NavLink>Leaderboard</NavLink>
        </Link>
      </Nav>
      <ScoreDisplay>Score: {score}</ScoreDisplay>
      <ThemeToggle onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </ThemeToggle>
    </HeaderContainer>
  );
}

export default Header;