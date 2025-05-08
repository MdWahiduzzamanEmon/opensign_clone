import React from 'react';
import { Box } from '@mui/material';

const Placeholder = ({ position, size, onDrop, onDragOver }) => {
  return (
    <Box
      onDrop={onDrop}
      onDragOver={onDragOver}
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        border: '2px dashed #ccc',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
    />
  );
};

export default Placeholder;
