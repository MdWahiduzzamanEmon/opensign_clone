import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomDialog = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true,
  showCloseIcon = true,
  successButtonText = 'Save',
  cancelButtonText = 'Cancel',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h4">{title}</Typography>
        {showCloseIcon ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      {
        <DialogActions sx={{ p: 2 }}>
          <>
            <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
              {cancelButtonText}
            </Button>
            <Button variant="contained" onClick={() => setOpen(false)} color="secondary">
              {successButtonText}
            </Button>
          </>
        </DialogActions>
      }
    </Dialog>
  );
};

export default CustomDialog;
