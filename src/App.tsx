import React from 'react';
import './App.css';
import Quiz from './Quiz/Quiz';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Quiz Maker</h1>
      <Quiz />
    </div>
  );
};

export default App;
