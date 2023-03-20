import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { AppError } from '@utils/AppError';
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useState } from 'react';

import { Button } from '@components/Button';
import { Input } from '@components/Input';

import BackgroundImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';

const signInSchema = yup
  .object({
    email: yup
      .string()
      .email()
      .required('Informe o e-mail')
      .email('E-mail inválido'),
    password: yup
      .string()
      .required('Informe a senha')
      .min(6, 'Mínimo 6 caracteres'),
  })
  .required();

type FormDataProps = yup.InferType<typeof signInSchema>;

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();

  async function handleSignIn({ email, password }: FormDataProps) {
    setIsLoading(true);

    try {
      await signIn(email, password);
      // Não setams o isLoading para false quando a requisição dá certo, pq ao fazer isto,
      // podemos receber um erro de que o componente já foi desmontado.
      // O ideal é que o isLoading seja setado para false no useEffect do componente
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Erro ao fazer login. Tente novamente mais tarde.';

      setIsLoading(false);

      toast.show({
        title,
        duration: 5000,
        placement: 'top',
        bg: 'red.500',
      });
    }
  }

  function handleNewAccount() {
    navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        px={10}
        pb={16}
      >
        <Image
          source={BackgroundImg}
          alt="pessoas treinando na academia"
          resizeMode="contain"
          position="absolute"
          defaultSource={BackgroundImg}
        />

        <Center my={24}>
          <LogoSvg />

          <Text
            color="gray.100"
            fontSize="sm"
          >
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            color="gray.100"
            fontSize="xl"
            mb={6}
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            mt={6}
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={48}>
          <Text
            color="gray.100"
            fontSize="sm"
            mb={3}
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
};
