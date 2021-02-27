import { useState, useEffect, useMemo, useCallback } from 'react';
import styles from '../styles/components/Countdown.module.css'

let coountDownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(0.1*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  //LEMBRAR DE MEMOIZAR ESSES VALORES
  const minutes = useMemo(() => Math.floor(time / 60),[time]) ;
  const seconds = useMemo(() => time % 60, [time]);

  const [minuteLeft, minuteRight] = useMemo(() => String(minutes).padStart(2,'0').split(''),[minutes]);
  const [secondLeft, secondRight] = useMemo(() => String(seconds).padStart(2,'0').split(''),[seconds]);
  
  function startCountdown(){
    setIsActive(true);
  }
  
  function resetCountdown(){
    clearTimeout(coountDownTimeout);
    setIsActive(false);
    setTime(25*60);
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
    }
  },[isActive,time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
        ) : (
          <>
            { isActive ? (
                <button
                  type="button"
                  className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                  onClick={startCountdown}
                >
                  Abandonar ciclo
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}
                >
                  Iniciar um ciclo
                </button>
              )
            }
          </>
        )
      }

      
    </div>
  );
}