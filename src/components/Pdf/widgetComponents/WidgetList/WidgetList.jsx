import React from 'react';
import { Box, Typography } from '@mui/material';
import GetWidgetType from '../../GetWidgetType/GetWidgetType';
import {
  faGripVertical,
  faSignature,
  faStamp,
  faUser,
  faIdBadge,
  faBuilding,
  faCalendar,
  faFont,
  faA,
  faCheckSquare,
  faCaretDown,
  faDotCircle,
  faImage,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

const widgetTypes = [
  { id: 'signature', name: 'signature', icon: faSignature },
  { id: 'stamp', name: 'stamp', icon: faStamp },
  { id: 'initials', name: 'initials', icon: faSignature },
  { id: 'name', name: 'name', icon: faUser },
  { id: 'job_title', name: 'job title', icon: faIdBadge },
  { id: 'company', name: 'company', icon: faBuilding },
  { id: 'date', name: 'date', icon: faCalendar },
  { id: 'text', name: 'text', icon: faFont },
  { id: 'text_input', name: 'text input', icon: faA },
  { id: 'checkbox', name: 'checkbox', icon: faCheckSquare },
  { id: 'dropdown', name: 'dropdown', icon: faCaretDown },
  { id: 'radio_button', name: 'radio button', icon: faDotCircle },
  { id: 'image', name: 'image', icon: faImage },
  { id: 'email', name: 'email', icon: faEnvelope },
];

const WidgetList = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: '#1a237e', fontWeight: 700, letterSpacing: 1 }}
      >
        Fields
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {widgetTypes.map((widget) => (
          <GetWidgetType key={widget.id} item={widget} widgetName={widget.name} />
        ))}
      </Box>
    </Box>
  );
};

export default WidgetList;
