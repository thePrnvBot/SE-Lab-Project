import React from "react";
import '../App.css';
import ReactSlider from 'react-slider';
import { useContext } from "react";
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

const Settings = () => {
    const settingsInfo = useContext(SettingsContext);
    return(
        <div style={{textAlign:'left'}}>
            <label>Work Minutes {settingsInfo.workMinutes}:00</label>
            <ReactSlider 
            className={"slider-work"} 
            thumbClassName={"thumb"}
            trackClassName={"track"} 
            value={settingsInfo.workMinutes} 
            onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
            min={1} 
            max={120}/>

            <label>Break Minutes: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider 
            className={"slider-break"} 
            thumbClassName={"thumb-break"}
            trackClassName={"track"}
            value={settingsInfo.breakMinutes} 
            onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1} 
            max={120}/>
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
        </div>
    );
}

export default Settings;