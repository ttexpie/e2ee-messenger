import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [test, setTest] = useState('');

  const callAPI = () => {
    fetch('http://localhost:4000/test')
      .then(res => res.text())
      .then(res => setTest(res))
      .catch(err => err);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {test}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
