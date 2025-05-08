import React from 'react';
import { Box, Typography } from '@mui/material';
import GetWidgetType from '../GetWidgetType/GetWidgetType';

const widgetTypes = [
  {
    id: 'signature',
    name: 'Signature',
    description: 'Add a signature field',
    icon: 'fa-light fa-signature',
  },
  {
    id: 'initial',
    name: 'Initial',
    description: 'Add an initial field',
    icon: 'fa-light fa-signature',
  },
  {
    id: 'date',
    name: 'Date',
    description: 'Add a date field',
    icon: 'fa-light fa-calendar',
  },
  {
    id: 'text',
    name: 'Text',
    description: 'Add a text field',
    icon: 'fa-light fa-font',
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Add a checkbox field',
    icon: 'fa-light fa-square-check',
  },
];

const WidgetList = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Available Widgets
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {widgetTypes.map((widget) => (
          <Box
            key={widget.id}
            sx={{
              userSelect: 'none',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <GetWidgetType item={widget} widgetName={widget.name} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WidgetList;
