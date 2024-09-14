import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
  max-width: 600px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xlarge};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const StyledLink = styled.a`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme, variant }) => theme.colors[variant] || theme.colors.primary};
  color: #FFFFFF;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, variant }) => theme.colors[`${variant}Hover`] || theme.colors.primaryHover};
  }
`;

const MotionLink = motion(StyledLink);

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

function HomePage() {
  return (
    <HomeContainer>
      <Title>Welcome to Guess What</Title>
      <Description>
        Test your movie knowledge with our exciting guessing game! Challenge yourself or compete with friends in our Infinite Mode.
      </Description>
      <ButtonContainer>
        <Link href="/infinite-mode" passHref legacyBehavior>
          <MotionLink
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            variant="infinite"
          >
            Infinite Mode
          </MotionLink>
        </Link>
        <Link href="/leaderboard" passHref legacyBehavior>
          <MotionLink
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Leaderboard
          </MotionLink>
        </Link>
      </ButtonContainer>
    </HomeContainer>
  );
}

export default HomePage;