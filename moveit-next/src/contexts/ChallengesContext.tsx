import { createContext, useCallback, useState } from 'react';

interface ChallengesProviderProps {
  children: React.ReactNode;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  levelUp: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
  },[])

  const startNewChallenge = useCallback(() => {
    console.log('new challenge');
  },[]);

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      levelUp
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}