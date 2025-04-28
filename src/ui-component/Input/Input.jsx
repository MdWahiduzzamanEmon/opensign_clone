import React from 'react';
import TextField from '@mui/material/TextField';

const CInput = ({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  type = 'text',
  id,
  onInvalidMessage = 'This field is required'
}) => {
  const handleChange = (e) => {
    const cleanedValue = e.target.value?.toLowerCase()?.replace(/\s/g, '');
    onChange(cleanedValue);
  };

  const handleInvalid = (e) => {
    e.target.setCustomValidity(onInvalidMessage);
  };

  const handleInput = (e) => {
    e.target.setCustomValidity('');
  };

  return (
    <TextField
      id={id}
      label={<>{label}</>}
      type={type}
      value={value}
      onChange={handleChange}
      onInvalid={handleInvalid}
      onInput={handleInput}
      required={required}
      disabled={disabled}
      fullWidth
      size="small"
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      sx={{
        '& .MuiInputBase-input': {
          fontSize: '12px'
        }
      }}
    />
  );
};

export default CInput;
