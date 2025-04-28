import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CInput from '../../../ui-component/Input/Input';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';

const TITLE = 'Sign Yourself';
const SUBTITLE = 'signyour-self-description';

const SignYourself = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <MainCard title={t(TITLE)} subTitle={t(SUBTITLE)}>
        <Box>
          <CInput type="file" label="File (pdf, png, jpg, jpeg)" onChange={setFile} required accept=".pdf, .png, .jpg, .jpeg" />

          <CInput label="Document title" value={title} onChange={setTitle} required />

          <CInput label="Note" value={note} onChange={setNote} required placeholder="Note to myself" />

          {/* Select folder section here (custom component) */}

          <Box display="flex" mt={4} gap={2}>
            <Button variant="contained" disabled>
              {t('next')}
            </Button>

            <Button variant="text" sx={{ textTransform: 'none', color: '#000' }}>
              {t('cancel')}
            </Button>
          </Box>
        </Box>
      </MainCard>
    </>
  );
};

export default SignYourself;
