import React, { createContext, useState } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  const emitTimerComplete = () => {
    console.log("Timer Complete");
    setIsTimerComplete(true);
  };

  return (
    <TimerContext.Provider value={{ isTimerComplete, emitTimerComplete }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
