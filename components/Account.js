import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Box,
  Center,
  SimpleGrid,
  Heading,
  Text,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import UserAvatar from '../components/UserAvatar';

export default function Account({ session }) {
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
    <Box as='form' mb={6} maxW='md' rounded='lg' shadow='xl'>
      <Center pb={0} flexDirection='column' mb={5}>
        <Heading as='h1' className='header'>
          User Profile
        </Heading>
        <Text as='p' mb={4}>
          Update your profile..
        </Text>
        <UserAvatar
          url={avatar_url}
          size={150}
          onUpload={url => {
            setAvatarUrl(url);
            updateProfile({ username, website, avatar_url: url });
          }}
        />
      </Center>

      <SimpleGrid
        columns={1}
        px={6}
        py={4}
        spacing={4}
        borderBottom='solid 1px'
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <FormLabel htmlFor='email'>Email Address</FormLabel>
        <Input
          variant='solid'
          mt={0}
          id='email'
          name='email'
          type='email'
          value={session.user.email}
          disabled
        />

        <FormLabel htmlFor='name'>Name</FormLabel>
        <Input
          variant='solid'
          mt={0}
          type='text'
          id='name'
          name='name'
          color={'#000'}
          value={username || ''}
          onChange={e => setUsername(e.target.value)}
        />

        <FormLabel htmlFor='website'>Website</FormLabel>
        <Input
          variant='solid'
          mt={0}
          id='website'
          name='website'
          type='website'
          color={'#000'}
          value={website || ''}
          onChange={e => setWebsite(e.target.value)}
        />

        <Button
          variant='solid'
          w='full'
          py={2}
          type='submit'
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
        <Button
          variant='solid'
          w='full'
          py={2}
          type='submit'
          onClick={() => supabase.auth.signOut()}
        >
          SignOut
        </Button>
      </SimpleGrid>
    </Box>
  );
}
