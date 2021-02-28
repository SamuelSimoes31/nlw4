import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProfileContextData {
  name: string;
  github: string;
  setName: Dispatch<SetStateAction<string>>;
  setGithub: Dispatch<SetStateAction<string>>;
}

interface ProfileContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileContextProvider = ({children} : ProfileContextProviderProps) => {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');

  return (
    <ProfileContext.Provider
      value={{
        name,
        github,
        setName,
        setGithub
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}