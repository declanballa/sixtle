import '../styles/Alert.css';

const Alert = ({ message }: { message: string }) => {
  return <div className={`alert ${message ? 'show' : ''}`}>{message}</div>;
};

export default Alert;
