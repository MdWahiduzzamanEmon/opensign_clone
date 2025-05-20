import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

const GetWidgetType = ({ item, widgetName }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { type: item.id, text: item.name, icon: item.icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#102048',
        color: '#fff',
        borderRadius: '999px',
        px: 1.5,
        py: 0.5,
        mb: 0.5,
        boxShadow: '0 1px 2px rgba(16,32,72,0.08)',
        border: '2px solid #1a237e',
        fontWeight: 600,
        fontSize: 16,
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: isDragging ? 0.5 : 1,
        transition: 'background 0.2s',
        '&:hover': { background: '#1a237e' },
        userSelect: 'none',
      }}
    >
      <FontAwesomeIcon icon={faGripVertical} style={{ marginRight: 12, color: '#b0b8d1' }} />
      <span style={{ flex: 1, textTransform: 'lowercase' }}>{widgetName}</span>
      <FontAwesomeIcon icon={item.icon} style={{ marginLeft: 12, color: '#fff' }} />
    </Box>
  );
};

export default GetWidgetType;
