import { IButtonProps, Button as NBButton, Text } from 'native-base';

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline';
};

export const Button = ({ title, variant = 'solid', ...rest }: ButtonProps) => {
  return (
    <NBButton
      bg={variant === 'outline' ? 'trasparent' : 'green.700'}
      w="full"
      h={14}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.700"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500',
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
      >
        {title}
      </Text>
    </NBButton>
  );
};
