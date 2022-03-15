import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import TipTapEditor from '../../components/TipTapEditor/TipTapEditor';

const Index = () => {
  return (
    <>
      <Container maxW='full'>
        <Head>
          <title>React Playground</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <div className='App'>
          <TipTapEditor />
        </div>
      </Container>
    </>
  );
};

export default Index;
