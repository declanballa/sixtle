import { useState } from 'react';

interface Alert {
  message: string;
}

const useAlert = () => {
  const [alert, setAlert] = useState<Alert>({
    message: ''
  });

  const showAlert = (alert: Alert) => {
    setAlert(alert);
  };

  const hideAlert = () => {
    setAlert({ message: '' });
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;
