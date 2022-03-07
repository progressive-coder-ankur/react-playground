import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  FormLabel,
  Image,
  Box,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Avatar({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const ImageBackground = useColorModeValue('gray.700', 'gray.200');

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      maxW='full'
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt='Avatar'
          rounded={'full'}
          className='avatar image'
          style={{ height: size, width: size }}
          mb={5}
          bg={ImageBackground}
        />
      ) : (
        <Box mb={5} style={{ height: size, width: size }} />
      )}
      <Box>
        <FormLabel w='full'>
          {uploading ? 'Uploading ...' : 'Upload'}
          <Input
            style={{
              visibility: 'hidden',
              position: 'absolute',
            }}
            type='file'
            id='single'
            onChange={() => uploadAvatar()}
            accept='image/*'
            disabled={uploading}
          />
        </FormLabel>
      </Box>
    </Box>
  );
}
