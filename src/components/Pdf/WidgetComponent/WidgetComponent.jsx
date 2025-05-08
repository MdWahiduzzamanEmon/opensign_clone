import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

const WidgetComponent = ({ widget, onDragStart }) => {
  const { type, position, size, content } = widget;

  const [{ isDragging }, drag] = useDrag({
    type: 'BOX',
    item: { type, text: type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const getWidgetContent = () => {
    switch (type) {
      case 'signature':
        return <i className="fa-light fa-signature" style={{ fontSize: '24px' }} />;
      case 'initial':
        return <i className="fa-light fa-signature" style={{ fontSize: '24px' }} />;
      case 'date':
        return <i className="fa-light fa-calendar" style={{ fontSize: '24px' }} />;
      case 'text':
        return <Typography variant="body2">{content || 'Text'}</Typography>;
      case 'checkbox':
        return <i className="fa-light fa-square-check" style={{ fontSize: '24px' }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      ref={drag}
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        border: '2px dashed #1976d2',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        backgroundColor: isDragging ? 'rgba(25, 118, 210, 0.2)' : 'rgba(25, 118, 210, 0.1)',
        opacity: isDragging ? 0.5 : 1,
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.2)',
        },
      }}
    >
      {getWidgetContent()}
    </Box>
  );
};

export default WidgetComponent;
