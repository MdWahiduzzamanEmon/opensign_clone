import React from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';

const GetWidgetType = ({ item, widgetName }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      sx={{
        width: { xs: 'fit-content', md: '100%' },
        ml: { xs: '6px', md: 0 },
        p: 0,
        overflow: 'hidden',
        borderWidth: '1.5px',
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
        {!isMobile && <i className="fa-light fa-grip-vertical" style={{ marginLeft: 3 }}></i>}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            ml: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: { xs: '100px', md: '200px' },
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
