import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from '@storage/storageConfig';

export const storageAuthTokenSave = async (token: string): Promise<void> => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
};

export const storageAuthTokenGet = async (): Promise<string | null> => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  return token;
};

export const storageAuthTokenClear = async (): Promise<void> => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
