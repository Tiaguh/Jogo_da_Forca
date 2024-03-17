import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { MdOutlineRefresh } from "react-icons/md";
import { FaPlay } from "react-icons/fa";

function Puppet({ attempts }) {
  const parts = [
    attempts >= 1 ? "visible" : "",
    attempts >= 2 ? "visible" : "",
    attempts >= 3 ? "visible" : "",
    attempts >= 4 ? "visible" : "",
    attempts >= 5 ? "visible" : "",
    attempts >= 6 ? "visible" : ""
  ];

  return (
    <div className="puppet">
      <div className={`head ${parts[0]}`} />
      <div className="stem">
        <div className={`left-arm ${parts[1]}`} />
        <div className={`body ${parts[2]}`} />
        <div className={`right-arm ${parts[3]}`} />
      </div>
      <div className="legs">
        <div className={`left-leg ${parts[4]}`} />
        <div className={`right-leg ${parts[5]}`} />
      </div>
    </div>
  );
}


export default function App() {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [maskedWord, setMaskedWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [attempt, setAttempt] = useState(0);

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
        setAttempt(prevAttempt => prevAttempt + 1);
        if (attempt + 1 >= 5) {
          setGameOver(true);
        }
      }
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
              <Puppet attempts={gameOver ? 5 : attempt} />
              <form onSubmit={checkGuess} className="game-container">
                <p>{maskedWord ? maskedWord : <h2>Escolhendo a palavra...</h2>}</p>
                <input
                  onChange={(e) => setGuess(e.target.value)}
                  maxLength={1}
                  value={guess}
                />

                {attempt}

              </form>
            </div>

            <div className="restart-game-container">
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
