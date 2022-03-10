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
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const TodosPage = props => {
  const { todos } = props;
  const InputHoverColor = useColorModeValue('gray.100', 'gray.700');
  const [todosState, setTodosState] = useState({});

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

  const handleSubmit = () => {
    console.log('submited');
  };

  return (
    <Box
      maxW={{ base: '100%', md: '7xl' }}
      px={{ base: '5', md: '10' }}
      py={{ base: '10', md: '20' }}
      bg={useColorModeValue('gray.200', 'gray.900')}
      rounded='lg'
    >
      <VStack spacing={'6'}>
        {todos.map(({ title, id, is_completed, user_id }) => {
          return (
            <>
              <HStack spacing={'6'} justifyContent='space-between'>
                <Editable
                  key={id}
                  defaultValue={title}
                  fontSize='2xl'
                  S
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                  onSubmit={() => handleSubmit()}
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
                  <Input py={2} px={4} width={'xl'} as={EditableInput} />
                  <EditableControls />
                </Editable>
                <IconButton colorScheme={'red'} icon={<DeleteIcon />} />
              </HStack>
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
