import { useState, useEffect } from 'react';
import Guess from './components/Guess';
import { fetchRandomWord, validateWord } from './services/api';
import './App.css';

function App() {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>(
    Array(7).fill(Array(6).fill(''))
  );
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  useEffect(() => {
    const results = async () => {
      const word = await fetchRandomWord();
      setWord(word);
      console.log(word);
    };

    results();
  }, []);

  const handleLetterChange = (
    letter: string,
    letterIndex: number,
    guessIndex: number
  ) => {
    setGuesses([
      ...guesses.slice(0, guessIndex),
      [
        ...guesses[guessIndex].slice(0, letterIndex),
        letter,
        ...guesses[guessIndex].slice(letterIndex + 1)
      ],
      ...guesses.slice(guessIndex + 1)
    ]);
  };

  const handleGuessSubmit = async () => {
    const validateWordResult = await validateWord(
      guesses[currentGuessIndex].join('')
    );

    if (!validateWordResult) {
      console.log('Invalid word');
      return;
    }

    setCurrentGuessIndex(currentGuessIndex + 1);
  };

  return (
    <div>
      <h1>Sixtle</h1>
      <div className='board'>
        {guesses.map((guess, guessIndex) => (
          <Guess
            word={word}
            key={guessIndex}
            guess={guess}
            isCurrentGuess={guessIndex === currentGuessIndex}
            isLocked={guessIndex < currentGuessIndex}
            onChange={(letter, letterIndex) =>
              handleLetterChange(letter, letterIndex, guessIndex)
            }
            onSubmit={handleGuessSubmit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
