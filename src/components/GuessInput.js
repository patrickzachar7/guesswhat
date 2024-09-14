import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SuggestionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-top: none;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const SuggestionItem = styled.li`
  padding: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SuggestionImage = styled.img`
  width: 50px;
  height: 75px;
  object-fit: cover;
  margin-right: ${({ theme }) => theme.spacing.small};
`;

function GuessInput({ onSubmit, isInfinite }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(async (query) => {
    try {
      const response = await axios.get('/api/movie-suggestions', {
        params: { query },
      });
      setSuggestions(response.data.results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []); // Dependency array added here

  useEffect(() => {
    if (inputValue.length >= 3) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
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