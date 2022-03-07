import React from 'react';
import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { FiMenu, FiSearch } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import NextLink from 'next/link';
import { supabase } from '../../lib/supabaseClient';

const TopNav = props => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <Flex
      as='header'
      align='center'
      justify='space-between'
      w='full'
      px='4'
      bg={useColorModeValue('white', 'gray.800')}
      borderBottomWidth='1px'
      borderColor={useColorModeValue('inherit', 'gray.700')}
      h='80px'
    >
      <IconButton
        aria-label='Menu'
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={props.sidebar.onOpen}
        icon={<FiMenu />}
        size='sm'
      />
      <InputGroup w='96' display={{ base: 'none', md: 'flex' }}>
        <InputLeftElement color='gray.500' icon={<FiSearch />} />
        <Input placeholder='Search...' />
      </InputGroup>

      <Flex align='center' gap={4}>
        <ThemeToggle />
        <Icon
          boxSize={6}
          size={5}
          color='gray.500'
          as={FaBell}
          cursor='pointer'
        />
        <Menu>
          <MenuButton
            as={Avatar}
            ml='4'
            size='md'
            name='user'
            src='/images/lary-head.svg'
            cursor='pointer'
          ></MenuButton>
          <MenuList>
            <MenuGroup title='User Menu'>
              <MenuItem>
                <NextLink href='/profile' passHref>
                  <Link _hover={{ textDecoration: 'none' }}>Profile</Link>
                </NextLink>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>Log Out</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default TopNav;
