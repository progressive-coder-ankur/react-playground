// import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Chakra from '../components/Chakra';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Auth from '../components/Auth/Auth';
import { createStandaloneToast } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [toastData, setToastData] = useState({
    title: '',
    description: '',
    status: '',
    duration: '',
    type: '',
    isClosable: true,
  });
  const [showToast, setShowToast] = useState(false);
  const toast = createStandaloneToast();

  showToast && toast(toastData);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Chakra cookies={pageProps.cookies}>
      {!session ? (
        <Auth setShowToast={setShowToast} setToastData={setToastData} />
      ) : (
        <Layout session={session}>
          <Component {...pageProps} session={session} />
        </Layout>
      )}
    </Chakra>
  );
}

export default MyApp;
