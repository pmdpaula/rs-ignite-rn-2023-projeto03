import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { FlatList, HStack, Heading, Text, VStack } from 'native-base';

import { useState } from 'react';

import { ExerciseCard } from '@components/ExerciseCard';
import { Group, GroupTypesProps } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';

export const Home = () => {
  const [groups, setGroups] = useState<GroupTypesProps[]>([
    'costa',
    'ombro',
    'bícipes',
    'tríceps',
  ]);
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Remada alta',
    'Levantamento terra',
    'Puxada traseira',
    'Puxada baixa',
    'Puxada alta',
  ]);
  const [groupSelectd, setGroupSelected] = useState<GroupTypesProps>('costa');

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigate('exercise');
  }

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              title={item}
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
};
