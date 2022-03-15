import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Editable,
  EditableInput,
  Box,
  EditablePreview,
  Input,
  IconButton,
  Center,
  Tooltip,
  useColorModeValue,
  HStack,
  VStack,
  Text,
  Heading,
  Checkbox,
} from '@chakra-ui/react';

import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import CheckImage from '../../components/CheckImage';

const TodosPage = props => {
  const { todos } = props;

  const textRef = useRef(null);
  const strikeThroughColor = useColorModeValue('#000', '#fff');

  const [fetchedTodos, setFetchedTodos] = useState([...todos]);
  const [newTitle, setNewTitle] = useState(null);
  const [error, setError] = useState({
    event: '',
    message: '',
    error: null,
  });

  useEffect(() => {
    const todosSubscription = supabase
      .from('todos')
      .on('*', payload => {
        let Event = payload.eventType;
        const newTodos = [...fetchedTodos];
        let oldtodo = newTodos.filter(todo => todo.id === payload.old.id);
        let INDEX = newTodos.indexOf(oldtodo[0]);

        switch (Event) {
          case 'INSERT':
            newTodos.push(payload.new);
            setFetchedTodos(newTodos);
            setNewTitle(null);
            break;
          case 'UPDATE':
            newTodos[INDEX] = payload.new;
            setFetchedTodos(newTodos);
            break;
          case 'DELETE':
            newTodos.splice(INDEX, 1);
            setFetchedTodos(newTodos);
          default:
            break;
        }
      })
      .subscribe();
  }, [fetchedTodos]);

  const handleSubmit = async id => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: newTitle })
        .match({ id: `${id}` });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
    setNewTitle(null);
  };

  const handleChecked = async (id, is_complete, i) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: !is_complete })
        .match({ id: `${id}` });
      if (error) throw error;
      if (data) {
        let newTodos = [...fetchedTodos];
        newTodos[i].is_complete = !is_complete;
        setFetchedTodos(newTodos);
      }
    } catch (error) {
      console.log(error);
      setError(error || error.message);
    }
  };

  const handleDelete = async (i, id) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .match({ id: id });
      if (error) throw error;
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const addTodo = async () => {
    const time = new Date(
      Date.now() + 100000 * 60 * -new Date().getTimezoneOffset()
    )
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    try {
      const { data, error } = await supabase.from('todos').upsert(
        [
          {
            title: newTitle,
            is_complete: false,
            created_at: time,
            user_id: supabase.auth.user().id,
          },
        ],
        { returning: 'minimal' }
      );
      if (error) throw error;
    } catch (error) {
      setError({
        event: 'Insert',
        message:
          error.code === '23502'
            ? 'Error inserting todo: Please enter a valid todo, Cannot add empty todo!!'
            : 'Error inserting todo: Please enter a valid todo, must be uinque..',
        error: error,
      });
    }
    setTimeout(() => {
      setError({
        event: '',
        message: '',
        error: null,
      });
    }, 6000);
  };

  return (
    <>
      <Center flexDirection={'column'}>
        <CheckImage />

        <Box
          maxW={{ base: '100%', md: '7xl' }}
          px={{ base: '5', md: '10' }}
          py={{ base: '10', md: '20' }}
        >
          <HStack
            spacing={'6'}
            justify='flex-start'
            align='center'
            w='2xl'
            bg={useColorModeValue('gray.700', 'gray.100')}
            color={useColorModeValue('gray.100', 'gray.700')}
            px={{ base: 8, md: 10 }}
            py={2}
            marginBottom={10}
          >
            <Editable
              value={newTitle !== null ? newTitle : ''}
              placeholder='Add a new todo...✍'
              fontSize='lg'
              isPreviewFocusable={true}
              selectAllOnFocus={true}
              display='flex'
              maxW={'full'}
              onSubmit={() => addTodo()}
              onChange={() => setNewTitle(textRef.current.value)}
              submitOnBlur={true}
              onCancel={() => setNewTitle(null)}
              w='xl'
            >
              <Tooltip label='Click to edit'>
                <EditablePreview py={2} px={4} w={'md'} cursor='pointer' />
              </Tooltip>
              <Input
                py={2}
                px={4}
                ref={textRef}
                width={'md'}
                as={EditableInput}
              />
            </Editable>
          </HStack>
          {error && (
            <Text as='p' color={'red.300'} fontSize='sm' fontStyle={'italic'}>
              {error.message}
            </Text>
          )}
          {fetchedTodos.length > 0 ? (
            <VStack align='flex-start' spacing={0} justify='center' w='full'>
              {fetchedTodos?.map(({ title, id, is_complete }, i) => {
                return (
                  <>
                    <HStack
                      key={id}
                      spacing={'6'}
                      justify='flex-start'
                      align='center'
                      w='2xl'
                      bg={i % 2 === 0 ? 'purple.600' : 'purple.400'}
                      px={{ base: 8, md: 10 }}
                      py={2}
                      borderTop={i !== 0 ? '1px solid' : 'none'}
                      transform={
                        i % 2 === 0 ? 'skewX(2.5deg)' : 'skewX(-2.5deg)'
                      }
                    >
                      <Checkbox
                        size='lg'
                        colorScheme={'green'}
                        defaultChecked={is_complete}
                        onChange={() => handleChecked(id, is_complete, i)}
                        spacing='2rem'
                        icon={<CheckIcon />}
                      />
                      <Editable
                        key={id}
                        defaultValue={title}
                        fontSize='lg'
                        isPreviewFocusable={true}
                        selectAllOnFocus={false}
                        onSubmit={() => handleSubmit(parseInt(id))}
                        display='flex'
                        maxW={'full'}
                        w='xl'
                      >
                        <Tooltip label='Click to edit'>
                          <EditablePreview
                            py={2}
                            px={4}
                            w={'max-content'}
                            cursor='pointer'
                            pos='relative'
                            color={'gray.100'}
                            _hover={{
                              background: 'rgba(0,0,0,0.3)',
                            }}
                            _before={{
                              content: '""',
                              position: 'absolute',
                              top: '50%',
                              left: '0%',
                              height: '3px',
                              width: is_complete ? '100%' : '0%',
                              backgroundColor: strikeThroughColor,
                              opacity: is_complete ? 1 : 0,
                              transition: 'all 0.4s ease-in-out',
                            }}
                          />
                        </Tooltip>
                        <Input
                          py={2}
                          px={4}
                          width={'md'}
                          onFocus={() => setNewTitle(title)}
                          onChange={e => setNewTitle(e.target.value)}
                          as={EditableInput}
                        />
                      </Editable>

                      <IconButton
                        justifySelf={'flex-end'}
                        colorScheme={'red'}
                        variant='ghost'
                        onClick={() => handleDelete(i, id)}
                        icon={<DeleteIcon boxSize={5} />}
                      />
                    </HStack>
                  </>
                );
              })}
            </VStack>
          ) : (
            <Heading fontSize={'2xl'} textAlign='center'>
              {'You dont have any todo, would you like to add some..'}
            </Heading>
          )}
          <HStack
            spacing={'6'}
            justify='space-between'
            align='center'
            w='2xl'
            bg={useColorModeValue('gray.700', 'gray.100')}
            color={useColorModeValue('gray.100', 'gray.700')}
            px={{ base: 8, md: 10 }}
            py={4}
            mt={4}
            fontSize='xl'
            fontWeight={'semibold'}
          >
            <Text>Total: {fetchedTodos.length} </Text>
            <Text>
              Completed:{' '}
              {fetchedTodos.filter(t => t.is_complete === true).length}{' '}
            </Text>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default TodosPage;

export const getServerSideProps = async () => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select(`title, id, is_complete`)
    .order('id', { ascending: true });
  // .range(0, 5);

  if (error) throw error;

  return {
    props: {
      todos,
    },
  };
};
