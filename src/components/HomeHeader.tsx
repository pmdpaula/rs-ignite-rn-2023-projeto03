import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import { TouchableOpacity } from 'react-native';

import defaulUserPhotoImg from '@assets/userPhotoDefault.png';

import { UserPhoto } from './UserPhoto';

export const HomeHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaulUserPhotoImg}
        alt="imagem do usuário"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text
          color="gray.100"
          fontSize="md"
        >
          Olá,
        </Text>

        <Heading
          color="gray.100"
          fontSize="lg"
          fontFamily="heading"
        >
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon
          as={MaterialIcons}
          name="logout"
          size={7}
          color="gray.200"
        />
      </TouchableOpacity>
    </HStack>
  );
};
