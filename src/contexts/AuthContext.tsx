import { UserDTO } from '@dtos/UserDTO';
import api from '@services/api';

import { ReactNode, createContext, useEffect, useState } from 'react';

import {
  storageUserClear,
  storageUserGet,
  storageUserSave,
} from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoadingUserStorageData: boolean;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sessions', { email, password });

    if (data.user) {
      setUser(data.user);
      storageUserSave(data.user);
    }
  }

  async function signOut() {
    setIsLoadingUserStorageData(true);
    setUser({} as UserDTO);
    await storageUserClear();

    setIsLoadingUserStorageData(false);
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged) {
      setUser(userLogged);
    }

    setIsLoadingUserStorageData(false);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
