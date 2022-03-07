import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import SidebarContent from './Sidebar';
import TopNav from './TopNav';

export default function Layout(props) {
  const sidebar = useDisclosure();

  return (
    <Box as='section' bg={useColorModeValue('gray.50', 'gray.700')}>
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
      <Box
        ml={{ base: 0, md: 60 }}
        maxW='full'
        overflow='hidden'
        transition='.3s ease'
      >
        <TopNav sidebar={sidebar} />

        <Box as='main' p='4'>
          {/* Add content here, remove div below  */}
          <Box
            borderWidth='4px'
            borderStyle='dashed'
            rounded='md'
            p={{ base: 6, md: 12 }}
            maxW='full'
            display={{ base: 'none', md: 'flex' }}
            justifyContent='center'
            overflow='hidden'
          >
            {props.children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
