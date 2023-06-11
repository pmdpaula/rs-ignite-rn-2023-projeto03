import { useAuth } from '@hooks/useAuth';
import OneSignal from 'react-native-onesignal';

export const tagUserInfoCreate = () => {
  const { user } = useAuth();
  if (!user) return;

  OneSignal.sendTags({ user_name: user?.name, user_email: user?.email });
};

export const tagLastWeekExercicesUpdate = (exercicesCount: string) => {
  OneSignal.sendTag('last_week_exercices_count', exercicesCount);
};
