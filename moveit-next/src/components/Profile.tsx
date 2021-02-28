import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useContext(ChallengesContext);

  const { name, github, unproceed } = useContext(ProfileContext);

  return (
    <div className={styles.profileContainer}>
      <img src={`https://github.com/${github}.png`} alt="Perfil" onClick={unproceed} />
      <div>
        <strong onClick={unproceed}>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}