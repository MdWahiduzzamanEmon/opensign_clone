import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CInput from '../../../ui-component/Input/Input';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import CButton from '../../../ui-component/CButton/CButton';

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
          <CInput
            type="file"
            label="File (pdf, png, jpg, jpeg)"
            onChange={setFile}
            required
            accept=".pdf, .png, .jpg, .jpeg"
          />

          <CInput label="Document title" value={title} onChange={setTitle} required />

          <CInput
            label="Note"
            value={note}
            onChange={setNote}
            required
            placeholder="Note to myself"
          />

          {/* Select folder section here (custom component) */}

          <Box display="flex" mt={4} gap={2}>
            <CButton disabled label={t('next')} />

            <CButton
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
              label={t('cancel')}
            />
          </Box>
        </Box>
      </MainCard>
    </>
  );
};

export default SignYourself;
