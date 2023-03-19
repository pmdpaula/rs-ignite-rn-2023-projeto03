import { Heading, SectionList, Text, VStack } from 'native-base';

import { useState } from 'react';

import { HistoryCard } from '@components/HistoryCard';
import { ScreenHeader } from '@components/ScreenHeader';

const exercisesList = [
  {
    title: '26.08.2022',
    data: ['Puxada fronal', 'Remada unilateral'],
  },
  {
    title: '27.08.2022',
    data: ['Puxada fronal', 'Remada curvada', 'Remada unilateral'],
  },
  {
    title: '28.08.2022',
    data: ['Remada alta', 'Levantamento terra', 'Puxada traseira'],
  },
  {
    title: '30.08.2022',
    data: ['Puxada baixa', 'Puxada alta'],
  },
] as const;

export const History = () => {
  const [exercises, setExercises] = useState<typeof exercisesList | []>(
    exercisesList,
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <HistoryCard title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color="gray.200"
            fontSize="md"
            // fontWeight="bold"
            mt={10}
            mb={3}
          >
            {title}
          </Heading>
        )}
        px={8}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text
            color="gray.100"
            textAlign="center"
            fontSize="md"
          >
            Nenhum exercício realizado.{'\n'}Vamos começar?
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
      />
    </VStack>
  );
};
