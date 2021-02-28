import React, { useContext } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';

import styles from '../styles/components/ProfileModal.module.css';

export const ProfileModal = () => {

  const { name, github, setName, setGithub, proceed } = useContext(ProfileContext);

  return (
    <>
    {
      proceed ? null : (
          <div className={styles.overlay}>
        <div className={styles.container}>
          <header>Bem vindo ao Moveit</header>
          <span>
            <label htmlFor="name">Seu nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
          </span>
          <span>
            <label htmlFor="github">Seu login do github</label>
            <input
              type="text"
              name="github"
              id="github"
              value={github}
              onChange={(e) => {setGithub(e.target.value)}}
            />
          </span>
          <button type="button" onClick={proceed}>Proceder</button>
        </div>
      </div>
      )
    }
    </>
  )
}

