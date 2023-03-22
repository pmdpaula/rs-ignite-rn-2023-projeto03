import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import api from '@services/api';
import { AppError } from '@utils/AppError';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import {
  // Alert,
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useState } from 'react';

import { TouchableOpacity } from 'react-native';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';

const PHOTO_SIZE = 33;

type ProfileFormData = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const profileSchema = yup.object().shape({
  name: yup.string().required('Informe o nome'),
  // old_password: yup
  //   .string()
  //   .min(6, 'Mínimo 6 caracteres')
  //   .nullable()
  //   .transform((value) => (value === '' ? null : value)),
  password: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .nullable()
    .transform((value) => (value === '' ? null : value)),
  password_confirmation: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .when('password', {
      is: (val: string) => val,
      then: (schema) =>
        schema
          .nullable()
          .transform((value) => (value === '' ? null : value))
          .required('Informe a confirmação da senha'),
    }),
});

export const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | undefined>(
    `https://ui-avatars.com/api/?name=${user.name}&size=256`,
  );

  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [1, 1],
        allowsEditing: true,
        selectionLimit: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri, {
          size: true,
        });

        if (photoInfo.exists && photoInfo.size > 1024 * 1024 * 3) {
          return toast.show({
            title: 'A imagem deve ter no máximo 3MB',
            placement: 'top',
            duration: 3000,
            bgColor: 'red.500',
          });
        }
      }

      const fileExtension = photoSelected.assets[0].uri.split('.').pop();

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLocaleLowerCase().replace(/\s/g, ''),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;

      const userPhotoUploadForm = new FormData();
      userPhotoUploadForm.append('avatar', photoFile);

      const avatarUpdatedResponse = await api.patch(
        '/users/avatar',
        userPhotoUploadForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const userUpdated = user;
      userUpdated.avatar = avatarUpdatedResponse.data.avatar;
      await updateUserProfile(userUpdated);

      setUserPhoto(photoSelected.assets[0].uri);

      toast.show({
        title: 'Foto atualizada com sucesso',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: ProfileFormData) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso',
        placement: 'top',
        duration: 3000,
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError ? error.message : 'Erro ao atualizar perfil',
        placement: 'top',
        duration: 3000,
        bgColor: 'red.500',
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center
          mt={6}
          px={10}
          mb={32}
        >
          {photoIsLoading && userPhoto ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : { uri: `https://ui-avatars.com/api/?name=${user.name}&size=256` }
              }
              alt="foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              mt={2}
              mb={8}
              fontSize="md"
              fontWeight="bold"
              color="green.500"
            >
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontFamily="heading"
            fontSize="md"
            mt={12}
            mb={2}
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirmation"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password_confirmation?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
};
