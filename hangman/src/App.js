import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MdOutlineRefresh } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

export default function App() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const fetchWord = async () => {
    try {
      const response = await axios.get('https://api.dicionario-aberto.net/random');
      setWord(response.data.word.toLowerCase());
    } catch (error) {
      console.error('Erro ao buscar as palavras:', error);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  useEffect(() => {
    setMaskedWord(maskWord());
  }, [word]);

  function startGame() {
    setGameStarted(true);
  }

  function restartGame() {
    setGameStarted(false);
    setGuess('');
    setGameOver(false);
    fetchWord();
  }

  function maskWord() {
    return word.split('').map((letter) => (letter === ' ' ? ' ' : '_')).join('');
  }

  function checkGuess(e) {
    e.preventDefault();

    if (word.includes(guess)) {
      const newMaskedWord = word
        .split('')
        .map((letter, index) => (letter === guess || letter === ' ' ? letter : maskedWord[index]))
        .join('');

      setMaskedWord(newMaskedWord);

      if (!newMaskedWord.includes('_')) {
        setGameOver(true);
      }
    }
    setGuess('');
  }

  return (
    <div className="container">
      <div className="black-board">
        {gameOver ? (
          <div className="game-end">
            <h2>Parabéns você acertou a palavra!</h2>
            <button onClick={restartGame}>Jogar novamente</button>
          </div>
        ) : gameStarted ? (
          <>
            <form onSubmit={checkGuess} className="game-container">
              <p>{maskedWord ? maskedWord : <h2>Escolhendo a palavra...</h2>}</p>
              <input
                onChange={(e) => setGuess(e.target.value)}
                maxLength={1}
                value={guess}
              />
            </form>

            <div className="restart-game-container">
              <button onClick={restartGame}>
                <MdOutlineRefresh color="#FFF" size={50} />
              </button>
            </div>
          </>
        ) : (
          <div className="start-game">
            <FaPlay
              color="#FFF"
              size={80}
              onClick={startGame}
            />
          </div>
        )}
      </div>
    </div>
  );
}
