import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xLarge};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.large};
  text-align: center;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.text};
  max-width: 500px;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xLarge};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const PlayButton = styled(motion.a)`
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large}; 
  background-color: #000000; // Black button color
  color: ${({ theme }) => theme.colors.buttonText || '#FFFFFF'};
  text-decoration: none;
  border-radius: 50px; // Fully rounded button
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 180px; // Approximation of Wordle's Play button width
  text-align: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

function HomePage() {
  return (
    <HomeContainer>
      <Title>Guess What</Title>
      <Description>
        Test your knowledge with Guess What, a fun and exciting guessing game! Can you guess the correct answer before time runs out?
      </Description>
      <ButtonContainer>
        <Link href="/infinite-mode" passHref legacyBehavior>
          <PlayButton
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Play
          </PlayButton>
        </Link>
      </ButtonContainer>
      <Footer>
        Created by Patrick Zachar
      </Footer>
    </HomeContainer>
  );
}

export default HomePage;