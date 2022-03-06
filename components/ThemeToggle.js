import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Box, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const ToggleDiv = motion(Box);

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <ToggleDiv
        display='inline-block'
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          aria-label='Toggle theme'
          fontWeight={'bold'}
          variant='ghost'
          onClick={toggleColorMode}
        >
          {useColorModeValue(
            <MoonIcon width={5} height={5} />,
            <SunIcon width={5} height={5} />
          )}
        </Button>
      </ToggleDiv>
    </AnimatePresence>
  );
};

export default ThemeToggle;
