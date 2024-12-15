import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [status, setStatus] = useState('Checking...');
  const [ipAddress, setIpAddress] = useState('-');
  const [networkStrength, setNetworkStrength] = useState('-');

  useEffect(() => {
    const checkInternetConnection = () => {
      setStatus('Checking...');
      if (navigator.onLine) {
        fetch('https://api.ipify.org/?format=json')
          .then((response) => response.json())
          .then((data) => {
            setIpAddress(data.ip);
            setStatus('Connected');
            const connection = navigator.connection;
            const networkStrength = connection ? connection.downlink + ' Mbps' : 'Unknown';
            setNetworkStrength(networkStrength);
          })
          .catch(() => {
            setStatus('Disconnected');
            setIpAddress('-');
            setNetworkStrength('-');
          });
      } else {
        setStatus('Disconnected');
        setIpAddress('-');
        setNetworkStrength('-');
      }
    };

    checkInternetConnection();

    // Optional: Add event listener to detect online/offline changes
    window.addEventListener('online', checkInternetConnection);
    window.addEventListener('offline', checkInternetConnection);

    return () => {
      window.removeEventListener('online', checkInternetConnection);
      window.removeEventListener('offline', checkInternetConnection);
    };
  }, []);

  return (
    <div className="container">
      <h1>Internet Connection Status Checker</h1>
      <p><strong>Connection Status:</strong><span>{status}</span></p>
      <p><strong>IP Address:</strong><span>{ipAddress}</span></p>
      <p><strong>Network Strength:</strong><span>{networkStrength}</span></p>
    </div>
  );
};

export default App;
