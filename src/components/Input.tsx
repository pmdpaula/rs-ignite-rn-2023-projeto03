import { FormControl, IInputProps, Input as NBInput } from 'native-base';

type InputProps = IInputProps & {
  errorMessage?: string | null;
};

export const Input = ({
  errorMessage = null,
  isInvalid,
  ...rest
}: InputProps) => {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <NBInput
        bg="gray.700"
        h={14}
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        mb={1}
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
        {...rest}
      />

      <FormControl.ErrorMessage
        mt={-7}
        mr={0.5}
        py={0.5}
        px={1}
        fontSize="2xs"
        borderTopLeftRadius={4}
        borderBottomRightRadius={2}
        alignSelf="flex-end"
        _text={{ color: 'white', fontSize: 'xs' }}
        bg="red.600"
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};
