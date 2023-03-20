import { AuthContextProvider } from '@contexts/AuthContext';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from '@components/Loading';

import { Routes } from './src/routes';
import { THEME } from './src/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
