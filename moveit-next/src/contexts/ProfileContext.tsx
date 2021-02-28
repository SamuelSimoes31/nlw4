import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react';

interface ProfileContextData {
  name: string;
  github: string;
  setName: Dispatch<SetStateAction<string>>;
  setGithub: Dispatch<SetStateAction<string>>;
  proceeded: boolean;
  proceed: () => void;
}

interface ProfileContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileContextProvider = ({children} : ProfileContextProviderProps) => {
  const [name, setName] = useState('');
  const [github, setGithub] = useState('');
  const [proceeded, setProceeded] = useState(false);

  const proceed = useCallback(() => {;
    if(name && github) setProceeded(true);
    else alert('Preencha os campos');
  },[name,github])

  return (
    <ProfileContext.Provider
      value={{
        name,
        github,
        setName,
        setGithub,
        proceeded,
        proceed
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}