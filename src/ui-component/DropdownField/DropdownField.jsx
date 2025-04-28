import React from 'react';
import { Autocomplete, TextField, Typography, Box, IconButton, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { INPUT_BORDER_RADIUS } from '../../config';

const CDropdownField = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  required = false,
  onAddClick,
  noOptionsText = 'Contact not found',
  hint,
  hintText = ''
}) => {
  const theme = useTheme();

  return (
    <Box mb={2}>
      {label && (
        <Box display="flex" alignItems="center" mb={0.5}>
          <Typography variant="body2" fontWeight="bold" mr={0.5}>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
          </Typography>
          {hint && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: '#e1e6ee',
                fontSize: '12px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'cyan',
                  color: 'white',
                  transition: 'all',
                  transitionDuration: 'revert-layer'
                }
              }}
            >
              ?
            </Box>
          )}
        </Box>
      )}

      <Box display="flex" alignItems="center">
        <Autocomplete
          options={options}
          value={value}
          onChange={(event, newValue) => onChange(newValue)}
          getOptionLabel={(option) => option.label || ''}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          noOptionsText={noOptionsText}
          fullWidth
          popupIcon={<></>}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              variant="outlined"
              size="small"
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
              InputProps={{
                ...params.InputProps,
                style: {
                  borderRadius: 25,
                  fontSize: '14px'
                },
                endAdornment: params.InputProps.endAdornment
              }}
            />
          )}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px'
            }
          }}
        />

        {onAddClick && (
          <IconButton
            onClick={onAddClick}
            sx={{
              marginLeft: 1,
              backgroundColor: '#f5f5f5',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              '&:hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            <AddIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default CDropdownField;
