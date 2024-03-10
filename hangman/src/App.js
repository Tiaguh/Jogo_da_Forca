import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MdOutlineRefresh } from "react-icons/md";

export default function App() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [gameOver, setGameOver] = useState(false);

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
    return word.split('').map((letter) => (letter === ' ' ? ' ' : '_')).join('');
  }

  function checkGuess(e) {
    e.preventDefault();

    if (word.includes(guess)) {
      console.log("A palavra tem essa letra.");
      const newMaskedWord = word
        .split('')
        .map((letter, index) => (letter === guess || letter === ' ' ? letter : maskedWord[index]))
        .join('');

      setMaskedWord(newMaskedWord);

      if (!newMaskedWord.includes('_')) {
        console.log("Parabéns! Você acertou todas as letras.");
        setGameOver(true);
      }
    } else {
      console.log("A palavra não tem essa letra.");
    }

    setGuess('');
  }

  return (
    <div className="container">
      <div className="black-board">
        {gameOver ? (
          <div className="game-end">
            <h2>Parabéns você acertou a palavra!</h2>
            <button onClick={() => setGameOver(false)} >Jogar novamente</button>
          </div>
        ) : maskedWord ? (
          <>
            <form onSubmit={checkGuess} className="game-container">
              <p>{maskedWord}</p>
              <input
                onChange={(e) => setGuess(e.target.value)}
                maxLength={1}
                value={guess}
              />
            </form>
            
            <div className="restart-game-container" >
              <button onClick={() => setGameOver(false)}>
                <MdOutlineRefresh color="#FFF" size={50} />
              </button>
            </div>
          </>
        ) : (
          <h2>Escolhendo a palavra...</h2>
        )}
      </div>
    </div>
  )
}