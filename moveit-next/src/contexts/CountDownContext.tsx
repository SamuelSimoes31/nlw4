import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountDownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: React.ReactNode;
}

let coountDownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountDownContextData);

export const CountdownProvider = ({children}:CountdownProviderProps) => {

  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = useMemo(() => Math.floor(time / 60),[time]) ;
  const seconds = useMemo(() => time % 60, [time]);

  function startCountdown(){
    setIsActive(true);
  }
  
  function resetCountdown(){
    clearTimeout(coountDownTimeout);
    setIsActive(false);
    setTime(25*60);
    setHasFinished(false);
  }

  useEffect(() => {
    if(isActive && time > 0){
      coountDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive,time])

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}