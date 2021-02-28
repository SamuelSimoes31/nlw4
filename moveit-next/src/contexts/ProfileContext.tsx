import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ProfileContextData {
  name: string;
  github: string;
  setName: Dispatch<SetStateAction<string>>;
  setGithub: Dispatch<SetStateAction<string>>;
  proceeded: boolean;
  proceed: () => void;
  unproceed: () => void;
}

interface ProfileContextProviderProps {
  children: React.ReactNode;
  name: string;
  github: string;
  proceeded: boolean;
}

export const ProfileContext = createContext({} as ProfileContextData);

export const ProfileContextProvider = ({children, ...rest} : ProfileContextProviderProps) => {
  
  const [name, setName] = useState(rest.name);
  const [github, setGithub] = useState(rest.github);
  const [proceeded, setProceeded] = useState(rest.proceeded);

  useEffect(() => {
    Cookies.set('name',String(name));
    Cookies.set('github',String(github));
    
  }, [name,github]);

  const proceed = () => {
    if(name && github) setProceeded(true);
    else alert('Preencha os campos');
  }

  const unproceed = () => {
    setProceeded(false);
  }

  return (
    <ProfileContext.Provider
      value={{
        name,
        github,
        setName,
        setGithub,
        proceeded,
        proceed,
        unproceed
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}