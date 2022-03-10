import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Editable,
  EditableInput,
  Box,
  EditablePreview,
  Input,
} from '@chakra-ui/react';

const TodosPage = props => {
  const { todos } = props;

  return (
    <Box>
      {todos.map(({ title, id, is_completed, user_id }) => {
        return (
          <>
            <Editable
              key={id}
              textAlign='center'
              defaultValue={title}
              fontSize='2xl'
              isPreviewFocusable={true}
            >
              <EditablePreview />
              <Input as={EditableInput} />
            </Editable>
          </>
        );
      })}
    </Box>
  );
};

export default TodosPage;

export const getServerSideProps = async () => {
  const { data: todos, error } = await supabase.from('todos').select('*');

  if (error) throw error;

  return {
    props: {
      todos,
    },
  };
};
