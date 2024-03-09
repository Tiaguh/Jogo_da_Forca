import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [maskedWord, setMaskedWord] = useState('');

  console.log(word);

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

  useEffect(() => {
    setMaskedWord(maskWord());
  }, [word]);

  function maskWord() {
    return word.split('').map((letter) => (letter === ' ' ? ' ' : '_')).join(' ');
  }

  function checkGuess(e) {
    e.preventDefault();

    if (word.includes(guess)) {
      console.log("A palavra tem essa letra.");
      const newMaskedWord = word
        .split('')
        .map((letter, index) => (letter === guess || letter === ' ' || maskedWord[index] === letter ? letter : '_'))
        .join(' ');
      setMaskedWord(newMaskedWord);
    } else {
      console.log("A palavra não tem essa letra.");
    }
    setGuess('');
  }


  return (
    <div className="container">
      <form
        onSubmit={checkGuess}
        className="game-container"
      >
        <p>{maskedWord}</p>

        <input
          onChange={(e) => setGuess(e.target.value)}
          maxLength={1}
        />
      </form>
    </div>
  );
}
