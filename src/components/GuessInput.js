import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SuggestionList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  padding: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

const SuggestionImage = styled.img`
  width: 50px;
  height: 75px;
  margin-right: ${({ theme }) => theme.spacing.small};
  vertical-align: middle;
`;

function GuessInput({ onSubmit, isInfinite }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get('/api/movie-suggestions', {
        params: { query, category: isInfinite ? 'infinite' : 'daily' },
      });
      setSuggestions(response.data || []);
      setError('');
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setError('Failed to fetch suggestions. Please try again.');
      setSuggestions([]);
    }
  }, [isInfinite]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(inputValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, fetchSuggestions]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    onSubmit(suggestion.title);
    setInputValue(suggestion.title);
    setSuggestions([]);
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your guess"
        />
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.poster_path && (
                <SuggestionImage
                  src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                  alt={suggestion.title}
                />
              )}
              {suggestion.title}
            </SuggestionItem>
          ))}
        </SuggestionList>
      )}
    </InputContainer>
  );
}

export default GuessInput;