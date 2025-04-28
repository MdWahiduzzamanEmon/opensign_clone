import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import CInput from '../../../ui-component/Input/Input';
import MainCard from 'ui-component/cards/MainCard';
import { useTranslation } from 'react-i18next';
import CDropdownField from '../../../ui-component/DropdownField/DropdownField';
import CustomDialog from '../../../ui-component/CustomDialog/CustomDialog';
import AddContact from '../../AddContact/AddContact';

const TITLE = 'Request Signature';
const SUBTITLE = 'requestsign-description';

const RequestSignature = () => {
  const { t } = useTranslation();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const demoContacts = [
    {
      label: 'John Doe',
      value: '123123',
    },
    {
      label: 'Jane Smith',
      value: '456456',
    },
    {
      label: 'Michael Johnson',
      value: '789789',
    },
    {
      label: 'Emily Davis',
      value: '101010',
    },
    {
      label: 'Robert Brown',
      value: '111111',
    },
    {
      label: 'Olivia Wilson',
      value: '222222',
    },
  ];

  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  console.log('Selected contact:', selectedContact);

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

          <CDropdownField
            label="Select Contact"
            options={demoContacts}
            value={selectedContact}
            onChange={setSelectedContact}
            placeholder="Select Contact"
            required
            onAddClick={() => setOpen(true)}
            hint
            hintText={t('signers-help')}
          />

          <CInput
            label="Note"
            value={note}
            onChange={setNote}
            required
            placeholder="Note to myself"
          />

          {/* Select folder section here (custom component) */}

          <Box display="flex" mt={4} gap={2}>
            <Button variant="contained" disabled color="secondary">
              {t('next')}
            </Button>

            <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
          </Box>
        </Box>
      </MainCard>

      {/* // Custom dialog for adding a new contact */}
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add contact"
        successButtonText="Submit"
        cancelButtonText="Reset"
      >
        <AddContact />
      </CustomDialog>
    </>
  );
};

export default RequestSignature;
