import { useAuth } from '@hooks/useAuth';
import { tagUserInfoCreate } from '@notifications/notificationsTags';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from 'react-native-onesignal';

import { useEffect, useState } from 'react';

import { Loading } from '@components/Loading';
import { Notification } from '@components/Notification';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const linking = {
  prefixes: ['com.axesoft.ignitegymapp://', 'exp+ignitegym://', 'ignitegymapp://'],
  config: {
    screens: {
      exercise2: {
        path: 'exercise2/:exerciseId',
        parse: {
          exerciseId: (exerciseId: string) => exerciseId,
        },
      },
      history: {
        path: 'history',
      },
      profile: {
        path: 'profile',
      },
      notfound: '*',
    },
  },
};

export const Routes = () => {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const notificationResponse = notificationReceivedEvent.getNotification();
        setNotification(notificationResponse);
      },
    );

    return () => unsubscribe;
  }, []);

  tagUserInfoCreate();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box
      flex={1}
      bg="gray.700"
    >
      <NavigationContainer
        theme={theme}
        linking={linking}
      >
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  );
};
