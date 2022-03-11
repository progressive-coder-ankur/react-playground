import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Editable,
  EditableInput,
  Box,
  EditablePreview,
  Input,
  ButtonGroup,
  IconButton,
  Flex,
  Tooltip,
  useColorModeValue,
  useEditableControls,
  HStack,
  VStack,
  Divider,
  Checkbox,
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const TodosPage = props => {
  const { todos } = props;
  const InputHoverColor = useColorModeValue('gray.100', 'gray.500');
  const DividerColor = useColorModeValue('black', 'white');
  const [fetchedTodos, setFetchedTodos] = useState([...todos]);
  const [newTitle, setNewTitle] = useState(null);
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const todos = supabase
      .from('todos')
      .on('*', payload => {
        console.log('Change received!', payload);
      })
      .subscribe();

    // return () => todos.removeAllSubscription();
  }, []);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }

  const handleSubmit = async (id, i) => {
    console.log(typeof id, typeof i);
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ title: newTitle })
        .match({ id: `${id}` });
      if (error) throw error;
      if (data) {
        let newtodos = [...fetchedTodos];
        let newtodo = { ...newtodos[i] };
        newtodo = newTitle;
        newtodos[i] = newtodo;
        setFetchedTodos(newtodos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      maxW={{ base: '100%', md: '7xl' }}
      px={{ base: '5', md: '10' }}
      py={{ base: '10', md: '20' }}
      boxShadow={'xl'}
      rounded='lg'
    >
      <VStack spacing={'6'}>
        {fetchedTodos.map(({ title, id, is_completed, user_id }, i) => {
          return (
            <>
              <HStack spacing={'6'} justifyContent='space-between'>
                <Checkbox
                  size='lg'
                  colorScheme={'green'}
                  defaultChecked={is_completed}
                  ischecked={is_completed}
                  spacing='2rem'
                  icon={<CheckIcon />}
                />
                <Editable
                  key={id}
                  defaultValue={title}
                  fontSize='2xl'
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onSubmit={() => handleSubmit(parseInt(id), i)}
                  display='flex'
                  maxW={'full'}
                >
                  <Tooltip label='Click to edit'>
                    <EditablePreview
                      py={2}
                      px={4}
                      w={'xl'}
                      cursor='pointer'
                      _hover={{
                        background: InputHoverColor,
                      }}
                    />
                  </Tooltip>
                  <Input
                    py={2}
                    px={4}
                    width={'xl'}
                    onChange={e => setNewTitle(e.target.value)}
                    as={EditableInput}
                  />
                  <EditableControls />
                </Editable>

                <IconButton
                  colorScheme={'red'}
                  icon={<DeleteIcon boxSize={3} />}
                />
              </HStack>
              <Divider
                orientation='horizontal'
                variant={'dashed'}
                __css={{
                  border: '1px',
                  borderColor: DividerColor,
                  width: '90%',
                }}
              />
            </>
          );
        })}
      </VStack>
    </Box>
  );
};

export default TodosPage;

export const getServerSideProps = async () => {
  const { data: todos, error } = await supabase
    .from('todos')
    .select(`*, profiles: user_id (id)`);

  if (error) throw error;

  return {
    props: {
      todos,
    },
  };
};
