import React, { useRef } from 'react';
import { TextField, Typography, Box, Button, useTheme, IconButton } from '@mui/material';
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
  accept,
  file,
  clearFile,
}) => {
  const fileInputRef = useRef(null);

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
          sx={{
            borderRadius: INPUT_BORDER_RADIUS,
            border: '1px solid #e1e6ee',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '10px',
            position: 'relative',
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
              padding: '5px 20px',
              cursor: disabled || file ? 'not-allowed' : 'pointer',
            }}
          >
            Choose File
            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept={accept}
              onChange={handleChange}
              disabled={file !== null || disabled}
            />
          </Button>
          {file ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2">{file.name}</Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation(); // ✨ Prevent triggering label click
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
                  clearFile();
                }}
                sx={{
                  ml: 1,
                  color: theme.palette.grey[500],
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18px"
                  height="18px"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </IconButton>
            </Box>
          ) : (
            <small>No file chosen</small>
          )}
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
                borderRadius: INPUT_BORDER_RADIUS, // move it here
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.main,
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default CInput;
