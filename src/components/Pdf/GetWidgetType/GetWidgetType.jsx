import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useDrag } from 'react-dnd';

const GetWidgetType = ({ item, widgetName }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'item',
    item: { type: item.id, text: item.name, icon: item.icon },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Button
      ref={drag}
      variant="outlined"
      color="primary"
      size="small"
      sx={{
        width: '100%',
        p: 1,
        borderWidth: '1.5px',
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
        <i className="fa-light fa-grip-vertical" style={{ marginLeft: 3 }}></i>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ml: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'text.primary',
              textTransform: 'capitalize',
            }}
          >
            {widgetName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          fontSize: '20px',
          width: 40,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <i className={item.icon}></i>
      </Box>
    </Button>
  );
};

export default GetWidgetType;
