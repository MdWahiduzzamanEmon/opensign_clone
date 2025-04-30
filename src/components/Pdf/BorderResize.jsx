import React from 'react';
import Box from '@mui/material/Box';

function BorderResize({ pos, isSignYourself, posHeight, right, top }) {
  const getHeight = () => {
    const height = posHeight(pos, isSignYourself);
    return height > 14 ? '14px' : `${height}px`;
  };

  const heightValue = getHeight();

  return (
    <Box
      sx={{
        width: heightValue,
        height: heightValue,
        position: 'absolute',
        right: right ? '12px' : '2px',
        bottom: top ? '12px' : '2px',
        cursor: 'sw-resize',
        borderRight: '3px solid #188ae2',
        borderBottom: '3px solid #188ae2',
        display: 'inline-block',
      }}
    />
  );
}

export default BorderResize;
