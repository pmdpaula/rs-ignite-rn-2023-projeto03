import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Entypo } from '@expo/vector-icons';
import api from '@services/api';
import { HStack, Heading, Icon, Image, Text, VStack } from 'native-base';

import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export const ExerciseCard = ({ data, ...rest }: ExerciseCardProps) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        mb={3}
        rounded="md"
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack
          flex={1}
          justifyContent="center"
          overflow="hidden"
        >
          <Heading
            fontFamily="heading"
            fontSize="lg"
            color="white"
          >
            {data.name}
          </Heading>

          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {data.series} séries de {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  );
};
