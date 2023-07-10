import React, { useState, useEffect } from 'react';
import '../App.css';

const Focus = () => {
  const [timer, setTimer] = useState(0);

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="focus-main">
      <h1>Focus App</h1>
      <p>Timer: {timer}</p>
      <input type="text" placeholder="Enter text" />
    </div>
  );
}

export default Focus;
