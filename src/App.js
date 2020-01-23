import React from 'react';
import logo from './logo.svg';
import './App.css';
import Minefield from './compoments/Minefield'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Minefield/>
    </div>
  );
}

export default App;
