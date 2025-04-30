import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ModalUi = ({
  children,
  title,
  isOpen,
  handleClose,
  showHeader = true,
  showClose = true,
  reduceWidth,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth={reduceWidth ? false : 'sm'}
      PaperProps={{
        sx: {
          width: reduceWidth || 'auto',
          maxHeight: '90vh',
          overflowY: 'auto',
          p: 0,
        },
      }}
    >
      {showHeader && (
        <Box position="relative" px={2} pt={2} pb={1}>
          {title && (
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          )}
          {showClose && (
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}

      <DialogContent sx={{ px: 2 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default ModalUi;
