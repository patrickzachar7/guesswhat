// src/components/Header.js

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
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  color: ${({ theme }) => theme.colors.text};
`;

const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ScoreDisplay = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.large};
  cursor: pointer;
`;

function Header({ toggleDarkMode, isDarkMode }) {
  const { score } = useScore();

  return (
    <HeaderContainer>
      <ThemeToggle onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </ThemeToggle>
      <Link href="/" passHref>
        <Logo>Guess What</Logo>
      </Link>
      <div style={{ width: '24px' }}></div> {/* Placeholder to balance the layout */}
    </HeaderContainer>
  );
}

export default Header;