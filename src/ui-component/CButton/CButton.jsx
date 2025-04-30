import React from 'react';
import Button from '@mui/material/Button';

const CButton = ({
  label,
  onClick,
  color = 'secondary',
  variant = 'contained',
  size = 'medium',
  startIcon = null,
  endIcon = null,
  disabled = false,
  fullWidth = false,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={sx}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CButton;
