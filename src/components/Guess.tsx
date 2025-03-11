import Tile from './Tile';

interface GuessProps {
  word: string;
  guess: string[];
  isLocked: boolean;
}

const Guess = ({ word, guess, isLocked }: GuessProps) => {
  return (
    <div className='guess'>
      {guess.map((letter, index) => {
        return (
          <Tile
            key={index}
            letter={letter}
            isLocked={isLocked}
            result={
              word[index] === letter
                ? ' exact'
                : word.includes(letter)
                ? ' exists'
                : ''
            }
          />
        );
      })}
    </div>
  );
};

export default Guess;
