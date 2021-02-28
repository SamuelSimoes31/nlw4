import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number
  currentExperience: number
  challengesCompleted: number
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge | null;
  experienceToNextLevel: number;
  startNewChallenge: () => void;
  levelUp: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.currentExperience ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level',String(level));
    Cookies.set('currentExperience',String(currentExperience));
    Cookies.set('challengesCompleted',String(challengesCompleted));
    
  }, [level,currentExperience, challengesCompleted]);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  },[])

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  const startNewChallenge = useCallback(() => {
    const randomChallangeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallangeIndex]; 
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉',{
        body: `Valendo ${challenge.amount}xp!`
      });
    }

  },[challenges]);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(false);
  },[]);

  const experienceToNextLevel = useMemo(() => {
    return Math.pow((level+1)*4,2)
  },[level]);

  const completeChallenge = useCallback(() => {
    if(!activeChallenge) return;
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if( finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  },[activeChallenge,currentExperience,experienceToNextLevel]);

  return (
    <ChallengesContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      startNewChallenge,
      levelUp,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}