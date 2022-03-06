import {
  Avatar,
  Box,
  Collapse,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBell, FaClipboardCheck, FaRss } from 'react-icons/fa';
import { BsGearFill } from 'react-icons/bs';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { HiCode } from 'react-icons/hi';
import { MdHome, MdKeyboardArrowRight, MdKeyboard } from 'react-icons/md';
import NextLink from 'next/link';
export default function Layout(props) {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();

  const NavItem = props => {
    const { icon, href, children, ...rest } = props;
    return (
      <NextLink href={href} passHref>
        <Link
          as='a'
          display='flex'
          alignItems='center'
          px='4'
          pl='4'
          py='3'
          cursor='pointer'
          color={useColorModeValue('inherit', 'gray.400')}
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.900'),
            color: useColorModeValue('gray.900', 'gray.200'),
          }}
          role='group'
          fontWeight='semibold'
          transition='.15s ease'
          {...rest}
        >
          {icon && (
            <Icon
              mx='2'
              boxSize='4'
              _groupHover={{
                color: `useColorModeValue('gray.600', 'gray.300')`,
              }}
              as={icon}
            />
          )}
          {children}
        </Link>
      </NextLink>
    );
  };

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
      </Flex>
    </Box>
  );
  return (
    <Box
      as='section'
      bg={useColorModeValue('gray.50', 'gray.700')}
      minH='100vh'
    >
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w='full' borderRight='none' />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
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
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size='sm'
          />
          <InputGroup w='96' display={{ base: 'none', md: 'flex' }}>
            <InputLeftElement color='gray.500' icon={<FiSearch />} />
            <Input placeholder='Search...' />
          </InputGroup>

          <Flex align='center' gap={4}>
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
                <MenuGroup title='Profile'>
                  <MenuItem>My Account</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        <Box as='main' p='4'>
          {/* Add content here, remove div below  */}
          <Box borderWidth='4px' borderStyle='dashed' rounded='md'>
            {props.children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
