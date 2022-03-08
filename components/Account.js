import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Heading,
  FormLabel,
  Input,
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import UserAvatar from '../components/UserAvatar';

export default function Account(props) {
  const { session } = props;

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>

          <UserAvatar
            size={150}
            url={avatar_url}
            onUpload={url => {
              setAvatarUrl(url);
              updateProfile({ username, website, avatar_url: url });
            }}
          />

          <FormControl id='userName' isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder='UserName'
              _placeholder={{ color: 'gray.500' }}
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id='email'>
            <FormLabel>Email address</FormLabel>
            <Input
              _placeholder={{ color: 'gray.500' }}
              type='email'
              value={session.user.email}
              disabled
            />
          </FormControl>
          <FormControl id='wbsite'>
            <FormLabel>Website</FormLabel>
            <Input
              placeholder='UserName'
              _placeholder={{ color: 'gray.500' }}
              type='text'
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'red.500',
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'blue.500',
              }}
            >
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
