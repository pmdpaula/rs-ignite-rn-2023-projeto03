import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';

import { useState } from 'react';

import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';

import BodySvg from '@assets/body.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import SeriesSvg from '@assets/series.svg';

type RouteParamsProps = {
  exercise: ExerciseDTO;
};

export const Exercise = () => {
  const [sendingRegister, setSendingRegister] = useState(false);

  const { goBack } = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { exercise } = route.params as RouteParamsProps;
  const toast = useToast();
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function handleExerciseHistoryRegister() {
    setSendingRegister(true);

    try {
      await api.post('/history', {
        exercise_id: exercise.id,
      });

      toast.show({
        title: 'Exercício registrado com sucesso!',
        placement: 'top',
        bgColor: 'green.700',
        duration: 3000,
      });

      navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível registrar o exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
        duration: 3000,
      });
    } finally {
      setSendingRegister(false);
    }
  }

  return (
    <VStack flex={1}>
      <VStack
        px={8}
        bg="gray.600"
        pt={16}
      >
        <TouchableOpacity onPress={goBack}>
          <Icon
            as={Feather}
            name="arrow-left"
            color="green.500"
            size={6}
          />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={4}
          mb={8}
        >
          <Heading
            color="gray.100"
            fontFamily="heading"
            fontSize="lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />

            <Text
              color="gray.200"
              ml={1}
              textTransform="capitalize"
            >
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView showsHorizontalScrollIndicator={false}>
        <VStack p={8}>
          <Box
            rounded="lg"
            mb={3}
            overflow="hidden"
          >
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              w="full"
              h={80}
              alt="nome do exercício"
              resizeMode="cover"
            />
          </Box>

          <Box
            bg="gray.600"
            rounded="md"
            pb={4}
            px={4}
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text
                  color="gray.200"
                  ml={2}
                >
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text
                  color="gray.200"
                  ml={2}
                >
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button
              title="Marcar como realizado"
              isLoading={sendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
