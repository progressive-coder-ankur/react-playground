import type { AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Chakra from '../components/Chakra';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  );
}

export default MyApp;
