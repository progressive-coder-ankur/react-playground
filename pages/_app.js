// import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Chakra from '../components/Chakra';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Auth from '../components/Auth';
import Account from '../components/Account';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <Chakra cookies={pageProps.cookies}>
      {!session ? (
        <Auth />
      ) : (
        <Layout session={session}>
          <Component {...pageProps} session={session} />
        </Layout>
      )}
    </Chakra>
  );
}

export default MyApp;
