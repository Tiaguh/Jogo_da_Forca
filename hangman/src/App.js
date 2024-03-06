import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get('https://api.dicionario-aberto.net/random');
        setWord(response.data.word.toLowerCase());
      } catch (error) {
        console.error('Erro ao buscar as palavras:', error);
      }
    };

    fetchWord();
  }, []);

  return (
    <div>
      <h1>Hangman Game</h1>
      {word}

      <input onChange={(e)=> setGuess(e.target.value)}  />

      {guess}

    </div>
  );
};
