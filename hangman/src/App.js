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
  const [attempt, setAttempt] = useState(0);
  const [letters, setLetters] = useState([]);

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
    setAttempt(0);
    setLetters([]);
    fetchWord();
  }

  function maskWord() {
    return word.split('').map((letter) => (letter === ' ' ? ' ' : '_')).join('');
  }

  function checkGuess(e) {
    e.preventDefault();

    if (!gameOver) {
      if (word.includes(guess)) {
        const newMaskedWord = word
          .split('')
          .map((letter, index) => (letter === guess || letter === ' ' ? letter : maskedWord[index]))
          .join('');

        setMaskedWord(newMaskedWord);

        if (!newMaskedWord.includes('_')) {
          setGameOver(true);
        }
      } else {
        setAttempt(attempt + 1);
        if (attempt >= 5) {
          setGameOver(true);
        }
      }

      setLetters([...letters, guess]);
    }

    setGuess('');
  }

  return (
    <div className="container">
      <div className="black-board">
        {gameOver ? (
          <div className="game-end">
            <h2>{maskedWord === word ? "Parabéns você acertou a palavra!" : "Game Over"}</h2>
            <button onClick={restartGame}>Jogar novamente</button>
          </div>
        ) : gameStarted ? (
          <div className="separator-container">
            <div className="separator">
              <div className="puppet">
                <div className="head" style={{ display: attempt >= 1 ? 'block' : 'none' }} />
                <div className="stem">
                  <div className="left-arm" style={{ display: attempt >= 3 ? 'block' : 'none' }} />
                  <div className="body" style={{ display: attempt >= 2 ? 'block' : 'none' }} />
                  <div className="right-arm" style={{ display: attempt >= 4 ? 'block' : 'none' }} />
                </div>
                <div className="legs">
                  <div className="left-leg" style={{ display: attempt >= 5 ? 'block' : 'none' }} />
                  <div className="right-leg" style={{ display: attempt >= 6 ? 'block' : 'none' }} />
                </div>
              </div>
              <form onSubmit={checkGuess} className="game-container">
                <p>{maskedWord ? maskedWord : <h2>Escolhendo a palavra...</h2>}</p>
                <input
                  onChange={(e) => setGuess(e.target.value)}
                  maxLength={1}
                  value={guess}
                />
              </form>
            </div>
            
            <div className="restart-game-container">

              <div className="selected-letters">
                <h3>Letras escolhidas:</h3>
                <div>
                  {letters.map((letter, index) => (
                    <span key={index}>{letter} - </span>
                  ))}
                </div>
              </div>

              <button onClick={restartGame}>
                <MdOutlineRefresh color="#FFF" size={50} />
              </button>
            </div>
          </div>
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
