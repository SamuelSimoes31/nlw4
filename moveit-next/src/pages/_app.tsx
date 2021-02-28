import React from 'react'
import { ProfileContextProvider } from '../contexts/ProfileContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProfileContextProvider>
      <Component {...pageProps} />
    </ProfileContextProvider>
  )
}

export default MyApp
