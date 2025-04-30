import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import CInput from '../../../ui-component/Input/Input';
import MainCard from 'ui-component/cards/MainCard';
import { useTranslation } from 'react-i18next';
import CDropdownField from '../../../ui-component/DropdownField/DropdownField';
import CustomDialog from '../../../ui-component/CustomDialog/CustomDialog';
import AddContact from '../../AddContact/AddContact';
import AdvancedOption from '../../AdvancedOption/AdvancedOption';
import { DEMO_CONTACTS } from '../../../constant/constant';
import CButton from '../../../ui-component/CButton/CButton';
import { useLocation, useNavigate } from 'react-router';
import { ArrowBack } from '@mui/icons-material';

const RequestSignature = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useLocation().search;
  // ?manageTemplate=true
  const manageTemplate = new URLSearchParams(query)?.get('manageTemplate') || false;
  //convert to boolean
  const isManageTemplate = Boolean(manageTemplate);

  const TITLE = isManageTemplate ? 'New Template' : 'Request Signature';
  const SUBTITLE = 'requestsign-description';

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  // console.log('Selected contact:', selectedContact);

  return (
    <>
      <MainCard
        title={t(TITLE)}
        subTitle={t(SUBTITLE)}
        //if isManageTemplate is true, show the back button in secondary props
        secondary={
          isManageTemplate && (
            <CButton
              label={<ArrowBack />}
              variant="outlined"
              color="secondary"
              onClick={() => navigate(-1)}
              sx={{ marginLeft: 'auto' }}
            />
          )
        }
      >
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
            options={DEMO_CONTACTS}
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

          <section>
            <AdvancedOption />
          </section>

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
