import { useState } from 'react';
import Tile from './Tile';

interface GuessProps {
  word: string;
  guess: string[];
  isCurrentGuess: boolean;
  isLocked: boolean;
  onChange: (letter: string, index: number) => void;
  onSubmit: () => void;
}

const Guess = ({
  word,
  guess,
  isCurrentGuess,
  isLocked,
  onChange,
  onSubmit
}: GuessProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const handleLetterChange = (
    letter: string,
    index: number,
    oldLetter: string
  ) => {
    console.log(letter);
    // Handle backspace
    if (letter === '') {
      onChange(letter, index);
      setCurrentLetterIndex(index - 1);
      return;
    }

    if (currentLetterIndex === guess.length) {
      return;
    }

    // Only allow letters
    if (!/^[a-zA-Z]+$/.test(letter)) {
      return;
    }

    if (oldLetter === '' && letter !== '') {
      onChange(letter, index);
      setCurrentLetterIndex(index + 1);
    }
  };

  const handleSubmit = () => {
    if (currentLetterIndex === guess.length) {
      onSubmit();
    }
  };

  return (
    <>
      <div className='guess'>
        {guess.map((letter, index) => {
          return (
            <Tile
              key={index}
              letter={letter}
              isCurrentLetter={isCurrentGuess && index === currentLetterIndex}
              isLocked={isLocked}
              result={
                word[index] === letter
                  ? 'exact'
                  : word.includes(letter)
                  ? 'exists'
                  : ''
              }
              onChange={(newLetter) =>
                handleLetterChange(newLetter, index, letter)
              }
              onSubmit={handleSubmit}
            />
          );
        })}
      </div>
    </>
  );
};

export default Guess;
