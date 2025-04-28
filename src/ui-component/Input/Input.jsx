import React from 'react';
import { TextField, Typography, Box, Button, useTheme } from '@mui/material';
import { INPUT_BORDER_RADIUS } from '../../config';

const CInput = ({
  type = 'text',
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  id,
  placeholder = '',
  multiline = false,
  rows = 3,
  accept
}) => {
  const handleChange = (e) => {
    if (type === 'file') {
      onChange(e.target.files[0]);
    } else {
      onChange(e.target.value);
    }
  };
  const theme = useTheme();

  return (
    <Box mb={2}>
      {label && (
        <Typography variant="body2" fontWeight="bold" mb={0.5}>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
      )}
      {type === 'file' ? (
        <Box
          id={id}
          component="label"
          sx={{
            borderRadius: INPUT_BORDER_RADIUS,
            border: '1px solid #e1e6ee',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px'
          }}
        >
          <Button
            variant="text"
            component="label"
            color="inherit"
            size="small"
            sx={{
              backgroundColor: '#e1e6ee',
              textTransform: 'uppercase',
              borderTopLeftRadius: INPUT_BORDER_RADIUS,
              borderBottomLeftRadius: INPUT_BORDER_RADIUS,
              padding: '5px 20px'
            }}
          >
            Choose File
            <input hidden type="file" accept={accept} onChange={handleChange} disabled={disabled} />
          </Button>
          <small>No file chosen</small>
        </Box>
      ) : (
        <TextField
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          fullWidth
          multiline={multiline}
          rows={rows}
          size="small"
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e1e6ee',
                borderRadius: INPUT_BORDER_RADIUS // move it here
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.main
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main
              }
            }
          }}
        />
      )}
    </Box>
  );
};

export default CInput;
