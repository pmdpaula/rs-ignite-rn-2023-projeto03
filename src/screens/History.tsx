import { HistoryDTO, HistoryWithTitleDTO } from '@dtos/HistoryDTO';
import { tagLastWeekExercicesUpdate } from '@notifications/notificationsTags';
import { useFocusEffect } from '@react-navigation/native';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import { Heading, SectionList, Text, VStack, useToast } from 'native-base';

import { useCallback, useState } from 'react';

import { HistoryCard } from '@components/HistoryCard';
import { Loading } from '@components/Loading';
import { ScreenHeader } from '@components/ScreenHeader';

export type HistorySectionsProps = { title: string; data: HistoryDTO[] };

export const History = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState<HistorySectionsProps[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    setIsLoading(true);

    try {
      const { data } = await api.get('/history');

      const isSunday = (date: Date) => date.getDay() === 4;
      const today = new Date();

      if (isSunday(today)) {
        // Se for domingo contar a quantidade de exercícios realizados na semana
        // e enviar uma notificação para o usuário com a quantidade de exercícios
        // realizados na semana.
        const minDate = new Date();
        minDate.setDate(today.getDate() - 7);

        const weekExercises = data.filter((item: HistoryWithTitleDTO) => {
          const day = item.title.split('.')[0];
          const month = item.title.split('.')[1];
          const year = item.title.split('.')[2];
          const itemDate = new Date(`${year}-${month}-${day}`);

          return itemDate >= minDate && itemDate <= today;
        });

        const initialValue = 0;
        const weekExercisesCount = weekExercises.reduce(
          (acc: number, curr: HistoryWithTitleDTO) => acc + curr.data.length,
          initialValue,
        );

        tagLastWeekExercicesUpdate(weekExercisesCount.toString());
      }

      setExercises(data);
      // setRefactoredExercises(refactorHistoryList(data));
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.700',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // function refactorHistoryList(rowData: ExerciseDTO[]): HistorySectionsProps[] {
  //   const refactoredData = [] as HistorySectionsProps[];

  //   rowData.forEach((histItem) => {
  //     const date = histItem.updated_at.split('T')[0];

  //     const isTitleSectionExists = refactoredData.find(
  //       (item) => item.title === date,
  //     );

  //     if (!isTitleSectionExists) {
  //       const newItem = {
  //         title: date,
  //         data: [histItem],
  //       };

  //       refactoredData.push(newItem);
  //     } else {
  //       const index = refactoredData.findIndex((item) => item.title === date);

  //       refactoredData[index].data.push(histItem);
  //     }
  //   });

  //   return refactoredData;
  // }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, []),
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Heading
              color="gray.200"
              fontFamily="heading"
              fontSize="md"
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
      )}
    </VStack>
  );
};
