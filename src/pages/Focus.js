import React, { useState } from 'react';
import '../App.css';
import Timer from '../components/Timer';
import Settings from '../components/Settings';
import SettingsContext from '../components/SettingsContext';

const Focus = () => {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return(
    <div>
      <SettingsContext.Provider value={{
        showSettings,
        workMinutes,
        breakMinutes,
        setShowSettings,
        setWorkMinutes,
        setBreakMinutes
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
};

export default Focus;
