import { useAuth } from '@hooks/useAuth';
import { tagUserInfoCreate } from '@notifications/notificationsTags';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';

import { Loading } from '@components/Loading';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export const Routes = () => {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  tagUserInfoCreate();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box
      flex={1}
      bg="gray.700"
    >
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
};
