import React, { useState, useEffect } from 'react';
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
  Checkbox,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import CheckImage from '../../components/CheckImage';

const TodosPage = props => {
  const { todos } = props;
  const [fetchedTodos, setFetchedTodos] = useState([...todos]);
  const [newTitle, setNewTitle] = useState(null);

  useEffect(() => {
    const todosSubscription = supabase
      .from('todos')
      .on('*', payload => {
        const newTodos = [...fetchedTodos];
        newTodos.push(payload.new);
        setFetchedTodos(newTodos);
      })
      .subscribe();
    setNewTitle(null);

    return () => supabase.removeSubscription(todosSubscription);
  }, [fetchedTodos]);

  const handleSubmit = async (id, i) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: newTitle })
        .match({ id: `${id}` });
      if (error) throw error;
      if (data) {
        const newTodos = [...fetchedTodos];
        newTodos[i].title = newTitle;
        setFetchedTodos(newTodos);
        setNewTitle(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecked = async (id, is_complete, i) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ is_complete: !is_complete })
        .match({ id: `${id}` });
      if (error) throw error;
      if (data) {
        const newTodos = [...fetchedTodos];
        newTodos[i].is_complete = !is_complete;
        setFetchedTodos(newTodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (i, id) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .match({ id: id });
      if (error) throw error;
      if (data) {
        const newTodos = [...fetchedTodos];
        newTodos.splice(i, 1);
        setFetchedTodos(newTodos);
      }
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
    console.log(time);
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
      if (data) {
        console.log(data);
      }
    } catch (error) {
      console.log(error || error.message);
    }
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
            py={{ base: 2, md: 4 }}
            marginBottom={10}
          >
            <Editable
              defaultValue={newTitle}
              placeholder={'Add a new todo...✍'}
              fontSize='lg'
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              display='flex'
              maxW={'full'}
              onSubmit={() => addTodo()}
              w='xl'
            >
              <Tooltip label='Click to edit'>
                <EditablePreview py={2} px={4} w={'xl'} cursor='pointer' />
              </Tooltip>
              <Input
                py={2}
                px={4}
                width={'md'}
                onChange={e => setNewTitle(e.target.value)}
                as={EditableInput}
              />
            </Editable>
          </HStack>

          <VStack align='flex-start' spacing={0} justify='center' w='full'>
            {fetchedTodos.map(({ title, id, is_complete }, i) => {
              return (
                <>
                  <HStack
                    spacing={'6'}
                    justify='flex-start'
                    align='center'
                    w='2xl'
                    bg={i % 2 === 0 ? 'purple.600' : 'purple.400'}
                    px={{ base: 8, md: 10 }}
                    py={{ base: 2, md: 4 }}
                    transform={i % 2 === 0 ? 'skewX(2.5deg)' : 'skewX(-2.5deg)'}
                    borderTop={i !== 0 ? '1px solid' : 'none'}
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
                          _hover={{
                            background: 'rgba(0,0,0,0.3)',
                          }}
                          _before={{
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            height: '2px',
                            width: is_complete ? '100%' : '0%',
                            backgroundColor: 'white',
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
                      icon={<DeleteIcon boxSize={6} />}
                    />
                  </HStack>
                  {/* <Divider orientation='horizontal' variant={'dashed'} /> */}
                </>
              );
            })}
          </VStack>
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
