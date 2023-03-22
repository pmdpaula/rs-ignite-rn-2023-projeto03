import { IPressableProps, Pressable, Text } from 'native-base';

type GroupProps = IPressableProps & {
  name: string;
  isActive: boolean;
};

// export type GroupTypesProps = 'costa' | 'ombro' | 'bícipes' | 'tríceps';

export const Group = ({ name, isActive, ...rest }: GroupProps) => {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      bg="gray.600"
      rounded="md"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{ borderColor: 'green.500', borderWidth: 1 }}
      {...rest}
    >
      <Text
        color={isActive ? 'green.500' : 'gray.100'}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
};
