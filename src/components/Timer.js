import React, { useContext, useState, useEffect, useRef} from "react";
import '../App.css';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SettingsContext from "./SettingsContext";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import TimerContext from "./TimerContext";
import emailjs from '@emailjs/browser';
import {useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { TodosContext } from "./TodosContext";

const red = '#f54e4e'
const green = '#aef359';


const Timer = ({}) => {

    const settingsInfo = useContext(SettingsContext);
    const {emitTimerComplete} = useContext(TimerContext); 
    const { todos } = useContext(TodosContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/main");
    };

    let noOfCompletedTasks = todos.filter(todo => todo.completed === true).length;
    let totalNoOfTasks = todos.length;

    const sendEmail = () => {
        const templateParams = {
          to_name: 'Partner', 
          from_name: 'FollowThru', 
          cPercent: (noOfCompletedTasks/totalNoOfTasks)*100,
          noTasks: totalNoOfTasks
        };
    
        emailjs.send('service_s2yt1rt', 'template_39rgywe', templateParams, '40-33Ryo1R0to2yAH')
          .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            setIsEmailSent(true);
        })
          .catch((error) => {
            console.error('Email sending failed!', error);
        });
    };

    const tick = () => {
        secondsLeftRef.current--; 
        setSecondsLeft(secondsLeftRef.current);
    }

    const initTimer = () => {
        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        getTime();
    }, []);

    useEffect(() => {
        const switchMode = () => {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
    
            setMode(nextMode);
            modeRef.current = nextMode;
    
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;   
        }

        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                setIsPaused(true);
                isPausedRef.current = true;
                secondsLeftRef.current=0;

                if (modeRef.current === 'work') {
                    emitTimerComplete();
                    sendEmail();
                }

                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);    
    }, [settingsInfo, emitTimerComplete]);

    const totalSeconds = mode === 'work' 
    ? settingsInfo.workMinutes * 60 
    : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    let minutes = Math.floor(secondsLeft / 60);
    if(minutes<0){
        minutes=0;
    }
    let seconds = secondsLeft % 60;
    if(seconds<0){
        seconds=0;
    }
    if (seconds < 10) seconds = '0' + seconds;

    const saveTime = () => {
        localStorage.setItem("secondsLeftRef.current", JSON.stringify(secondsLeftRef.current));
    }
    
    const getTime = () => {
        if (localStorage.getItem("secondsLeftRef.current") === null) {
            let time  = JSON.parse(localStorage.getItem("secondsLeftRef.current"));
            setSecondsLeft(time);
        }
    }

    return(
        <div className='focus-main'>
            <CircularProgressbar 
            value={percentage} 
            text={minutes + ':' + seconds} 
            styles={buildStyles({
            textColor:'#fff',
            pathColor: mode === 'work' ? red : green,
            trailColor:'rgba(255,255,255,.2)'
        })}/>

            <div style={{marginTop:'20px'}}>
                {isPaused 
                ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }}/> 
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; saveTime(); }}/>}
            </div>
            <div style={{marginTop:'20px'}}>
                <button className='settings-button' onClick={() => {
                        settingsInfo.setShowSettings(true);
                        saveTime();
                    }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
                </button>
            </div>
            <BackButton style={{marginTop:'10px'}} onClick={() => {
                saveTime();
                backToHome();
            }}/>
        </div>
    );
}

export default Timer;