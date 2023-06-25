import { ExerciseDTO } from '@dtos/ExerciseDTO';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import { Platform } from 'react-native';

import { Exercise } from '@screens/Exercise';
import { Exercise2 } from '@screens/Exercise2';
import { History } from '@screens/History';
import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';

import HistorySvg from '@assets/history.svg';
import HomeSvg from '@assets/home.svg';
import ProfileSvg from '@assets/profile.svg';

type AppRoutesProps = {
  home: undefined;
  exercise: { exercise: ExerciseDTO };
  exercise2: { exerciseId: string };
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export const AppRoutes = () => {
  const { colors, sizes } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[800],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg
              width={iconSize}
              height={iconSize}
              fill={color}
            />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="exercise2"
        component={Exercise2}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
};
