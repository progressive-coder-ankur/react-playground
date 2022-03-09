import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

const SignUpForm = props => {
  const {
    showPassword,
    setShowPassword,
    email,
    password,
    setEmail,
    setPassword,
    handleSignup,
    setShowSignUp,
    loading,
  } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ValidEmailPattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const onSubmit = data => {
    handleSignup(data.email, data.password);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id='email' isRequired isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  isRequired
                  value={email}
                  {...register('email', {
                    required: 'This is required',
                    pattern: {
                      value: ValidEmailPattern,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  onChange={e => setEmail(e.target.value)}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id='password' isRequired isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 6,
                        message: 'Minimum length should be 6',
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message:
                          'Password must contain at least one uppercase, one lowercase, one number and one special character',
                      },
                    })}
                    onChange={e => setPassword(e.target.value)}
                    isRequired
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  size='lg'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  // onClick={() => handleSignup(email, password)}
                >
                  {loading ? 'Submitting' : 'Sign up'}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user ?
                  <Link
                    ml={2}
                    color={'blue.400'}
                    onClick={() => setShowSignUp(false)}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
};

export default SignUpForm;
