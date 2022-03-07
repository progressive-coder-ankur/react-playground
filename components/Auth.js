import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Box,
  SimpleGrid,
  Container,
  Button,
  Center,
  Flex,
  VisuallyHidden,
  Input,
  Text,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import { AiOutlineGithub } from 'react-icons/ai';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthGithub = async () => {
    const { user, session, error } = await supabase.auth.signUp({
      provider: 'github',
    });
  };

  return (
    <>
      <Container
        maxW='container.lg'
        centerContent
        alignItems='center'
        justifyContent={'center'}
        h='100vh'
      >
        <Box as='form' mb={6} maxW='md' rounded='lg' shadow='xl'>
          <Center pb={0} flexDirection='column' mb={5}>
            <Heading as='h1' className='header'>
              Supabase + Next.js
            </Heading>
            <Text as='p'>Sign in via magic link with your email below</Text>
          </Center>
          <SimpleGrid
            columns={1}
            px={6}
            py={4}
            spacing={4}
            borderBottom='solid 1px'
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <Flex>
              <VisuallyHidden>Email Address</VisuallyHidden>
              <Input
                mt={0}
                type='email'
                placeholder='Email Address'
                required={true}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Flex>

            <Flex>
              <VisuallyHidden>Password</VisuallyHidden>
              <Input
                mt={0}
                type='password'
                placeholder='password'
                required={true}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Flex>

            <Button
              variant='solid'
              w='full'
              py={2}
              type='submit'
              onClick={e => {
                e.preventDefault();
                handleLogin(email, password);
              }}
            >
              {loading ? 'loading' : 'Sign up for free'}
            </Button>
          </SimpleGrid>
          <Flex px={6} py={4}>
            <Button
              py={2}
              w='full'
              colorScheme='blue'
              leftIcon={<AiOutlineGithub size={20} />}
              onClick={e => {
                e.preventDefault();
                handleAuthGithub();
              }}
            >
              Continue with Github
            </Button>
          </Flex>
        </Box>
      </Container>
    </>
  );
}
