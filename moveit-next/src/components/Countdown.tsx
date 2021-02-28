import { useState, useEffect, useMemo, useContext } from 'react';
import { CountdownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/Countdown.module.css'



export function Countdown() {
  const { 
    hasFinished,
    isActive,
    minutes,
    seconds,
    resetCountdown,
    startCountdown  
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo(() => String(minutes).padStart(2,'0').split(''),[minutes]);
  const [secondLeft, secondRight] = useMemo(() => String(seconds).padStart(2,'0').split(''),[seconds]);
  
  

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