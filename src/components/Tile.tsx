import { useEffect, useRef } from 'react';
import '../styles/Tile.css';

interface TileProps {
  letter: string;
  isCurrentLetter: boolean;
  isLocked: boolean;
  result: string;
  onChange: (letter: string) => void;
  onSubmit: () => void;
}

const Tile = ({
  letter,
  isCurrentLetter,
  isLocked,
  result,
  onChange,
  onSubmit
}: TileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCurrentLetter) {
      inputRef.current?.focus();
    }
  }, [isCurrentLetter]);

  const handleChange = (value: string) => {
    if (value !== '') {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      onChange('');
    }

    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <input
      ref={inputRef}
      className={`tile ${isCurrentLetter ? 'current' : ''} ${
        isLocked ? 'locked' : ''
      } ${result}`}
      onChange={(e) => handleChange(e.target.value)}
      onKeyDown={handleKeyDown}
      type='text'
      value={letter}
    />
  );
};

export default Tile;
