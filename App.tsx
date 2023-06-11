import { AuthContextProvider } from '@contexts/AuthContext';
import { ONE_SIGNAL_APP_ID } from '@env';
import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';
import OneSignal from 'react-native-onesignal';

import { Loading } from '@components/Loading';

import { Routes } from './src/routes';
import { THEME } from './src/theme';

OneSignal.setAppId(String(ONE_SIGNAL_APP_ID));
OneSignal.promptForPushNotificationsWithUserResponse();

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
      <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
