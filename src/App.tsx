import { useState, useEffect } from 'react';

import Guess from './components/Guess';
import { fetchRandomWord, validateWord } from './services/api';
import Keyboard from './components/Keyboard';
import useAlert from './hooks/useAlert';
import Alert from './components/Alert';
import './App.css';

export interface GuessedLetter {
  letter: string;
  exact: boolean;
  exists: boolean;
}

function App() {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>(
    Array(6).fill(Array(6).fill(''))
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<GuessedLetter[]>([]);
  const { alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    const fetchWord = async () => {
      const word = await fetchRandomWord();
      setWord(word);
      // For testing, remove later
      console.log(word);
    };

    fetchWord();
  }, []);

  const processKey = (key: string) => {
    if (key === 'Enter') {
      handleGuessSubmit();
      return;
    }

    if (key === 'Backspace') {
      if (currentLetterIndex > 0) {
        handleLetterChange('');
        setCurrentLetterIndex((prev) => prev - 1);
      }

      return;
    }

    if (currentLetterIndex === 6) {
      return;
    }

    if (!/^[a-zA-Z]+$/.test(key)) {
      return;
    }

    if (guesses[currentGuessIndex][currentLetterIndex] === '') {
      handleLetterChange(key);
      setCurrentLetterIndex((prev) => prev + 1);
      return;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => processKey(event.key);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLetterIndex]);

  const handleLetterChange = (letter: string) => {
    const newGuesses = [...guesses];

    // Handle backspace
    if (letter === '') {
      setGuesses([
        ...newGuesses.slice(0, currentGuessIndex),
        [
          ...newGuesses[currentGuessIndex].slice(0, currentLetterIndex - 1),
          '',
          ...newGuesses[currentGuessIndex].slice(currentLetterIndex)
        ],
        ...newGuesses.slice(currentGuessIndex + 1)
      ]);
      return;
    } else {
      setGuesses([
        ...newGuesses.slice(0, currentGuessIndex),
        [
          ...newGuesses[currentGuessIndex].slice(0, currentLetterIndex),
          letter,
          ...newGuesses[currentGuessIndex].slice(currentLetterIndex + 1)
        ],
        ...newGuesses.slice(currentGuessIndex + 1)
      ]);
    }
  };

  const handleGuessSubmit = async () => {
    const submission = guesses[currentGuessIndex].join('');

    const validateWordResult = await validateWord(submission);

    if (submission.length < 6) {
      showAlert({ message: 'Not enough letters' });

      setTimeout(() => {
        hideAlert();
      }, 2000);

      return;
    }

    if (!validateWordResult) {
      showAlert({ message: 'Invalid word' });

      setTimeout(() => {
        hideAlert();
      }, 2000);

      return;
    }

    setCurrentGuessIndex((prev) => prev + 1);
    setCurrentLetterIndex(0);
    setGuessedLetters([
      ...guessedLetters,
      ...submission.split('').map((letter, index) => {
        return {
          letter,
          exact: word[index] === letter,
          exists: word.includes(letter) && word[index] !== letter
        };
      })
    ]);
  };

  return (
    <div className='container'>
      <h1>Sixtle</h1>
      <Alert message={alert.message} />
      <div className='board'>
        {guesses.map((guess, guessIndex) => (
          <Guess
            word={word}
            key={guessIndex}
            guess={guess}
            isLocked={guessIndex < currentGuessIndex}
          />
        ))}
      </div>
      <Keyboard guessedLetters={guessedLetters} onClick={processKey} />
    </div>
  );
}

export default App;
