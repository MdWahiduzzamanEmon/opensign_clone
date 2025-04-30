import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CInput from '../../../ui-component/Input/Input';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import CButton from '../../../ui-component/CButton/CButton';
import { useNavigate } from 'react-router';
import { generateTitleFromFilename } from '../../../constant/constant';

const TITLE = 'Sign Yourself';
const SUBTITLE = 'signyour-self-description';

const SignYourself = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  // console.log('File:', file);
  // console.log('Title:', title);
  // console.log('Note:', note);

  useEffect(() => {
    if (file) {
      const res = generateTitleFromFilename(file.name);
      setTitle(res);
    } else {
      setTitle('');
    }
  }, [file]);

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
            file={file}
            clearFile={() => setFile(null)}
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
            <CButton
              label={t('next')}
              onClick={() => {
                navigate('/sign/customize-pdf-sign', {
                  state: {
                    file,
                    title,
                    note,
                  },
                });
              }}
            />

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
