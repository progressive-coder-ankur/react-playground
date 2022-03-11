import { Flex, Box, Text, useColorModeValue } from '@chakra-ui/react';
import { MdHome, MdKeyboard } from 'react-icons/md';

import NavItem from './NavItem';

const SidebarContent = props => (
  <Box
    as='nav'
    pos='fixed'
    top='0'
    left='0'
    zIndex='sticky'
    h='full'
    pb='10'
    overflowX='hidden'
    overflowY='auto'
    bg={useColorModeValue('white', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth='1px'
    w='60'
    {...props}
  >
    <Flex px='4' py='5' align='center'>
      <Text
        fontSize='2xl'
        ml='2'
        color={useColorModeValue('brand.500', 'white')}
        fontWeight='semibold'
      >
        React PlayGround
      </Text>
    </Flex>
    <Flex
      direction='column'
      as='nav'
      fontSize='sm'
      color='gray.600'
      aria-label='Main Navigation'
    >
      <NavItem href='/' icon={MdHome}>
        Home
      </NavItem>
      <NavItem href='/typing-pro' icon={MdKeyboard}>
        Typing Pro
      </NavItem>
      <NavItem href='/todos' icon={MdKeyboard}>
        Todos
      </NavItem>
    </Flex>
  </Box>
);

export default SidebarContent;
