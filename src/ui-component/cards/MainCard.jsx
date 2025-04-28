import React, { forwardRef } from 'react';

// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import { ListSubheader } from '@mui/material';

// constant
const headerStyle = {
  '& .MuiCardHeader-action': { mr: 0 }
};

const MainCard = forwardRef(function MainCard(
  {
    border = false,
    boxShadow,
    children,
    content = true,
    contentClass = '',
    contentSX = {},
    headerSX = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    subTitle,
    title,
    ...others
  },
  ref
) {
  const { mode } = useConfig();
  const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: 'divider',
        ':hover': {
          boxShadow: boxShadow ? shadow || defaultShadow : 'inherit'
        },

        ...sx
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ ...headerStyle, ...headerSX, padding: '10px 16px' }} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={{ ...headerStyle, ...headerSX }} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}
      {subTitle && (
        <small
          style={{
            padding: '0 16px',
            marginBottom: '8px',
            display: 'block',
            color: mode === 'dark' ? '#fff' : 'gray'
          }}
        >
          {subTitle}
        </small>
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

export default MainCard;
