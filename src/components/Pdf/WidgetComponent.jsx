import React from 'react';
import { Box } from '@mui/material';
import { useDrag } from 'react-dnd';
import WidgetList from './WidgetList';
import { useTranslation } from 'react-i18next';
import { isMobile } from '../../config';

function WidgetComponent(props) {
  const { t } = useTranslation();

  // Define drag sources for each widget type
  const [, signature] = useDrag({
    type: 'BOX',
    item: { type: 'signature', text: 'signature' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, initials] = useDrag({
    type: 'BOX',
    item: { type: 'initials', text: 'initials' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, name] = useDrag({
    type: 'BOX',
    item: { type: 'name', text: 'name' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, date] = useDrag({
    type: 'BOX',
    item: { type: 'date', text: 'date' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, text] = useDrag({
    type: 'BOX',
    item: { type: 'text', text: 'text' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, checkbox] = useDrag({
    type: 'BOX',
    item: { type: 'checkbox', text: 'checkbox' },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const widgetRefs = [
    {
      type: 'signature',
      ref: signature,
      icon: 'fa-light fa-signature',
      description: t('widgets-name.signature'),
    },
    {
      type: 'initials',
      ref: initials,
      icon: 'fa-light fa-signature',
      description: t('widgets-name.initials'),
    },
    { type: 'name', ref: name, icon: 'fa-light fa-user', description: t('widgets-name.name') },
    { type: 'date', ref: date, icon: 'fa-light fa-calendar', description: t('widgets-name.date') },
    { type: 'text', ref: text, icon: 'fa-light fa-font', description: t('widgets-name.text') },
    {
      type: 'checkbox',
      ref: checkbox,
      icon: 'fa-light fa-square-check',
      description: t('widgets-name.checkbox'),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <WidgetList
        updateWidgets={widgetRefs}
        addPositionOfSignature={props.addPositionOfSignature}
        handleDivClick={props.handleDivClick}
        handleMouseLeave={props.handleMouseLeave}
      />
    </Box>
  );
}

export default WidgetComponent;
