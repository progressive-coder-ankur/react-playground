import React from 'react';
import {
  ButtonGroup,
  IconButton,
  CheckIcon,
  CloseIcon,
  EditIcon,
  Flex,
  useEditableControls,
} from '@chakra-ui/react';

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent='center' size='sm'>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='center'>
      <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
};

export default EditableControls;
