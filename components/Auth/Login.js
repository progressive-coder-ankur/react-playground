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
  Link,
  Checkbox,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LogInForm = props => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    setShowSignUp,
    showPassword,
    setShowPassword,
    loading,
    handleLoginWithMaginLink,
  } = props;

  const [useMaginLink, setUseMagicLink] = useState(true);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                isRequired
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            {useMaginLink ? (
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={e => {
                    e.preventDefault();
                    handleLoginWithMaginLink(email);
                  }}
                >
                  {loading ? 'Logging In..' : 'Sign in'}
                </Button>
              </Stack>
            ) : (
              <>
                <FormControl id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
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
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={e => {
                      e.preventDefault();
                      handleLogin(email, password);
                    }}
                  >
                    {loading ? 'Logging In..' : 'Sign in'}
                  </Button>
                </Stack>
              </>
            )}

            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={e => {
                e.preventDefault();
                setUseMagicLink(!useMaginLink);
              }}
            >
              {useMaginLink ? 'Try other method' : 'Try magic link method'}
            </Button>

            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account ?{' '}
                <Link
                  ml={2}
                  color={'blue.400'}
                  onClick={() => setShowSignUp(true)}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LogInForm;
