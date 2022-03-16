import { Box, Button, Icon, IconButton } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import {
  RiBold,
  RiItalic,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiCodeView,
  RiDoubleQuotesL,
  RiH1,
  RiH2,
  RiFormatClear,
  RiListCheck2,
  RiListOrdered,
  RiMarkPenLine,
  RiListUnordered,
  RiParagraph,
  RiSeparator,
  RiTextWrap,
} from 'react-icons/ri';

const MenuBar = ({ editor }) => {
  const items = [
    {
      icon: RiBold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: RiItalic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'RiStrikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: 'RiCodeView',
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: 'RiMarkPenLine',
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'RiH1',
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: 'RiH2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'RiParagraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: 'RiListUnordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'RiListOrdered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      icon: 'RiListCheck2',
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: 'RiCodeBoxLine',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'RiDoubleQuotesL',
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: 'RiSeparator',
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'RiTextWrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: 'RiFormatClear',
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'RiArrowGoBackLine',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'RiArrowGoForwardLine',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <Box
      className='editor__header'
      style={{
        alignItems: 'center',
        borderBottom: '3px solid #0d0d0d',
        display: 'flex',
        flex: '0 0 auto',
        gap: '0.5rem',
        flexWrap: 'wrap',
        padding: '0.25rem',
        justifyContent: 'center',
      }}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? (
            <Box className='divider' />
          ) : (
            <Button
              onClick={item.action}
              title={item.title}
              colorScheme={item.isActive ? 'cyan' : 'gray'}
              color={'gray.900'}
            >
              <Icon as={item.icon} />
            </Button>
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default MenuBar;
