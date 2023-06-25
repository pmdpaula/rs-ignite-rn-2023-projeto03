import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base';

import { useCallback, useEffect, useState } from 'react';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelectd, setGroupSelected] = useState<string>('antebraço');

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();

  function handleOpenExerciseDetails(data: ExerciseDTO) {
    navigate('exercise2', { exerciseId: data.id });
    // navigate('exercise', { exercise: data });
  }

  async function fetchGroups() {
    setIsLoading(true);

    try {
      const { data } = await api.get('/groups');
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        duration: 3000,
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchExercises() {
    setIsLoading(true);

    try {
      const { data } = await api.get(`/exercises/bygroup/${groupSelectd}`);
      setExercises(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.';
      toast.show({
        title,
        placement: 'top',
        duration: 3000,
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercises();
    }, [groupSelectd]),
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelectd.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        minH={10}
        maxH={10}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <VStack
          flex={1}
          px={8}
        >
          <HStack
            justifyContent="space-between"
            mb={5}
          >
            <Heading
              color="gray.200"
              fontFamily="heading"
              fontSize="md"
              fontWeight="bold"
            >
              Exercícios
            </Heading>

            <Text
              color="gray.200"
              fontSize="md"
            >
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  );
};
