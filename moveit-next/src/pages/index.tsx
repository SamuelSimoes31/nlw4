import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ProfileModal } from '../components/ProfileModal';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountDownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import React, { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home( props: HomeProps ) {
  const { proceeded } = useContext(ProfileContext);

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
          {!proceeded && <ProfileModal />}
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ( ctx ) => {
  
  const { level,currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}