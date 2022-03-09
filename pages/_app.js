// import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Chakra from '../components/Chakra';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import Auth from '../components/Auth/Auth';
import { createStandaloneToast, useToast } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  const [data, setData] = useState(null);

  const toast = createStandaloneToast();

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    if (data) {
      toast({
        title: data.title,
        description: data.description,
        status: data.status,
        duration: data.duration,
        isClosable: data.isClosable,
      });

      setData(null);
    }
  }, [toast, data]);

  return (
    <Chakra cookies={pageProps.cookies}>
      {!session ? (
        <Auth setData={setData} />
      ) : (
        <Layout session={session}>
          <Component {...pageProps} session={session} />
        </Layout>
      )}
    </Chakra>
  );
}

export default MyApp;
