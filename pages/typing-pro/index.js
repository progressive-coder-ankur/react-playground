import Head from 'next/head';
import {
  Container,
  Box,
  Text,
  Heading,
  VStack,
  Textarea,
  Center,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState, useRef } from 'react';

const TypingPro = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [disable, setDisable] = useState(false);
  const [userInput, setUserInput] = useState('');

  const blockcolor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');
  const textcolor = useColorModeValue('gray.900', 'gray.100');

  const textAreaRef = useRef(null);

  const getData = () => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        setQuote(data.content);
      })
      .then(() => setLoading(false));
  };

  const splitQuote = useCallback(() => {
    let array = [];

    for (let i = 0; i < quote.length; i++) {
      array.push({ name: quote[i], isCorrect: null });
    }

    setCharacters([...array]);
    textAreaRef.current && textAreaRef.current.focus();
  }, [quote]);

  const handleChange = e => {
    e.preventDefault();
    let InputValue = e.target.value;
    let array = [...characters];
    if (InputValue.length === characters.length) {
      setDisable(!disable);
      setLoading(true);
      setTimeout(() => {
        getData();
        setDisable(false);
        setUserInput('');
      }, 1000);
    } else {
      for (let i = 0; i < InputValue.length; i++) {
        array[i] = {
          name:
            characters[i].name === InputValue[i]
              ? InputValue[i]
              : characters[i].name,
          isCorrect: characters[i].name === InputValue[i] ? true : false,
        };
        setUserInput(InputValue);

        setCharacters([...array]);
      }
    }
  };

  useEffect(() => {
    loading && !quote && getData();
    quote && splitQuote();
  }, [loading, splitQuote, quote]);

  return (
    <>
      <Head>
        <title>Typing Hero</title>
        <meta name='description' content='Typing practice app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Center>
        {loading ? (
          <Box w='full' h='full' className='loading'>
            <Spinner />
          </Box>
        ) : (
          <VStack
            spacing={{ base: 10, md: 20 }}
            justify='center'
            align={'center'}
          >
            characters.length && (
            <Box w='5xl' textAlign={'center'} p={5} bg={blockcolor}>
              {characters.map((item, i) => (
                <Text
                  as='span'
                  key={i}
                  fontSize='2xl'
                  color={
                    item.isCorrect === null
                      ? textcolor
                      : item.isCorrect
                      ? 'green'
                      : 'red'
                  }
                >
                  {item.name}
                </Text>
              ))}
            </Box>
            <Textarea
              onChange={e => handleChange(e)}
              disabled={disable}
              value={userInput}
              ref={textAreaRef}
              rows={10}
              h='15rem'
            />
            )
          </VStack>
        )}
      </Center>
    </>
  );
};

export default TypingPro;
