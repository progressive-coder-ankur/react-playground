import React from 'react';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import Account from '../../components/Account';

const index = ({ session }) => {
  return (
    <>
      <Head>
        <title>User-Profile</title>
        <meta name='description' content='Profile page of user.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container p={10}>
        <Account key={session.user.id} session={session} />
      </Container>
    </>
  );
};

export default index;
