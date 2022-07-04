import React from 'react';
import './styles/App.module.css';
import Pomodoro from './pomodoro/Pomodoro';

function App() {
  return (
    <div className='App'>
      <div className='body'>
        <header className='App-header container'>
          <h1 className='title'>Pomodoro Timer</h1>
        </header>
        <div className='container'>
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}

export default App;
