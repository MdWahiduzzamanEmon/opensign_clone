import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function PrevNext({ pageNumber, allPages, changePage }) {
  const { t } = useTranslation();

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Box display="flex" alignItems="center">
      <Button
        variant="outlined"
        size="small"
        onClick={previousPage}
        disabled={pageNumber <= 1}
        sx={{ minWidth: 36, padding: 0.5 }}
      >
        <ArrowBackIosNewIcon fontSize="small" />
      </Button>

      <Typography
        variant="body2"
        fontWeight={500}
        sx={{ mx: 2, fontSize: { xs: '0.75rem', xl: '1.25rem' } }}
      >
        {pageNumber || (allPages ? 1 : '--')} {t('of')} {allPages || '--'}
      </Typography>

      <Button
        variant="outlined"
        size="small"
        onClick={nextPage}
        disabled={pageNumber >= allPages}
        sx={{ minWidth: 36, padding: 0.5 }}
      >
        <ArrowForwardIosIcon fontSize="small" />
      </Button>
    </Box>
  );
}

export default PrevNext;
