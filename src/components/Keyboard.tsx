import { GuessedLetter } from '../App';
import '../styles/Keyboard.css';

interface KeyboardProps {
  guessedLetters: GuessedLetter[];
  onClick: (key: string) => void;
}

const Keyboard = ({ guessedLetters, onClick }: KeyboardProps) => {
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const getClassName = (key: string) => {
    let className = '';

    guessedLetters.forEach((letter) => {
      if (letter.letter === key) {
        if (letter.exact) {
          className = 'exact';
        } else if (letter.exists) {
          className = 'exists';
        } else {
          className = 'locked';
        }
      }
    });

    return className;
  };

  return (
    <div className='keyboard'>
      {rows.map((row, index) => (
        <div key={index} className='row'>
          {index === 2 ? (
            <button className='enter' onClick={() => onClick('Enter')}>
              Enter
            </button>
          ) : (
            ''
          )}
          {row.split('').map((key) => (
            <button
              key={key}
              onClick={() => onClick(key)}
              className={getClassName(key)}
            >
              {key}
            </button>
          ))}
          {index === 2 ? (
            <button className='delete' onClick={() => onClick('Backspace')}>
              <svg
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                height='20'
                viewBox='0 0 24 24'
                width='30'
              >
                <path
                  fill='white'
                  d='M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z'
                ></path>
              </svg>
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
