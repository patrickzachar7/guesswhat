import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background-color: ${props => props.theme.colors.card};
  padding: ${props => props.theme.spacing.large};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  margin-top: ${props => props.theme.spacing.large};
`;

const ResultTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xlarge};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const ResultImage = styled.img`
  max-width: 300px;
  height: auto;
  margin-bottom: ${props => props.theme.spacing.medium};
`;

const ResultInfo = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ResultSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.medium};
`;

function ResultDetail({ result }) {
  return (
    <ResultContainer>
      <ResultTitle>{result.title}</ResultTitle>
      {result.poster_path && (
        <ResultImage 
          src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} 
          alt={`Poster for ${result.title}`} 
        />
      )}
      <ResultSection>
        <ResultInfo><strong>Release Date:</strong> {result.release_date}</ResultInfo>
        <ResultInfo><strong>Rating:</strong> {result.vote_average}/10</ResultInfo>
      </ResultSection>
      <ResultSection>
        <ResultInfo><strong>Overview:</strong> {result.overview}</ResultInfo>
      </ResultSection>
      {result.genres && (
        <ResultSection>
          <ResultInfo><strong>Genres:</strong> {result.genres.map(genre => genre.name).join(', ')}</ResultInfo>
        </ResultSection>
      )}
      {result.credits && result.credits.cast && (
        <ResultSection>
          <ResultInfo><strong>Cast:</strong> {result.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}</ResultInfo>
        </ResultSection>
      )}
    </ResultContainer>
  );
}

export default ResultDetail;