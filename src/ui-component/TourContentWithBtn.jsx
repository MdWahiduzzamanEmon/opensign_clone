import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Checkbox, FormControlLabel, Paper } from '@mui/material';

function TourContentWithBtn({ message, isChecked, video }) {
  const { t } = useTranslation();
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = () => {
    const newChecked = !isCheck;
    setIsCheck(newChecked);
    if (isChecked) {
      isChecked(newChecked);
    }
  };

  return (
    <Box>
      <Typography variant="body2" mb={1}>
        {message}
      </Typography>

      {video && (
        <Paper
          elevation={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: { xs: 200, md: 300 },
            width: '100%',
            mb: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={video}
            title="Tour Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Paper>
      )}

      <FormControlLabel
        control={<Checkbox size="small" checked={isCheck} onChange={handleCheck} />}
        label={
          <Typography variant="caption" color="textSecondary">
            {t('tour-content')}
          </Typography>
        }
        sx={{ justifyContent: 'center', mt: 2 }}
      />
    </Box>
  );
}

export default TourContentWithBtn;
