import '../styles/Tile.css';

interface TileProps {
  letter: string;
  isLocked: boolean;
  result: string;
}

const Tile = ({ letter, isLocked, result }: TileProps) => {
  return (
    <input
      className={`tile${isLocked ? ' locked' : ''}${result}`}
      type='text'
      onChange={() => {}}
      value={letter}
    />
  );
};

export default Tile;
