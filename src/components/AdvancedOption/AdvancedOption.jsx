import React from 'react';
import SubCard from 'ui-component/cards/SubCard';
import Collapse from '@mui/material/Collapse';
import { Box, FormLabel, Switch, Typography } from '@mui/material';
import CRadioGroup from '../../ui-component/CRadioGroup/CRadioGroup';
import CInput from '../../ui-component/Input/Input';
import Grid from '@mui/material/Grid';
import CDropdownField from '../../ui-component/DropdownField/DropdownField';
import { useTranslation } from 'react-i18next';
import CustomDialog from '../../ui-component/CustomDialog/CustomDialog';
import AddContact from '../AddContact/AddContact';
import { DEMO_CONTACTS } from '../../constant/constant';

const AdvancedOption = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Typography
        variant="h5"
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', color: 'blue' }}
        textOverflow={'ellipsis'}
        overflow={'hidden'}
        whiteSpace={'nowrap'}
      >
        Advanced Options
      </Typography>
      <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
        Click to toggle advanced options
      </Typography>
      <Collapse in={open}>
        <DocumentFollowSettings />
      </Collapse>
    </div>
  );
};

export default AdvancedOption;

const DocumentFollowSettings = () => {
  const { t } = useTranslation();
  const [selectedValue, setSelectedValue] = React.useState('yes');
  const [timeToCompleteDays, setTimeToCompleteDays] = React.useState(15);
  const [openBcc, setOpenBcc] = React.useState(false);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [redirectUrl, setRedirectUrl] = React.useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        justifyContent: 'space-between',
        gap: '1rem',
        alignItems: 'stretch', // important to stretch items vertically
      }}
    >
      <SubCard sx={{ flex: 1 }}>
        <Typography variant="h5">Document Follow Settings</Typography>

        <Grid container rowGap={2} sx={{ mt: 2 }}>
          <Grid xs={12}>
            <CRadioGroup
              label="Send in order"
              name="sendOrder"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              disabledOptions={['disabled']}
              row
            />
          </Grid>

          <Grid xs={12}>
            <CInput
              label="Time to complete (days)"
              type="number"
              value={timeToCompleteDays}
              onChange={setTimeToCompleteDays}
              required
            />
          </Grid>

          <Grid xs={12}>
            <CDropdownField
              label="Bcc"
              options={DEMO_CONTACTS}
              value={selectedContact}
              onChange={setSelectedContact}
              hint
              hintText={t('bcc-help')}
              onAddClick={() => setOpenBcc(true)}
            />
          </Grid>
        </Grid>
      </SubCard>

      {/* Vertical line */}
      <Box
        sx={{
          width: '2px',
          backgroundColor: '#ccc',
          height: 'auto', // auto, because parent stretches
          minHeight: '100%',
        }}
      />

      <SubCard sx={{ flex: 1 }}>
        <Grid container rowGap={2}>
          <Grid xs={12}>
            <FormLabel
              component="legend"
              color="secondary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Auto reminder
            </FormLabel>
            <Switch
              color="secondary"
              defaultChecked
              inputProps={{ 'aria-label': 'controlled' }}
              onChange={(event) => {
                console.log(event.target.checked);
              }}
            />
          </Grid>
          <Typography variant="h4" gutterBottom>
            Security settings
          </Typography>

          <Grid xs={12}>
            <CRadioGroup
              label="Enable OTP verification"
              name="otpVerification"
              //   value={selectedValue}
              //   onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              row
            />
          </Grid>

          <Grid xs={12}>
            <CRadioGroup
              label="Enable tour"
              name="tour"
              //   value={selectedValue}
              //   onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              row
            />
          </Grid>

          {/* Notify on signatures */}
          <Grid xs={12}>
            <CRadioGroup
              label="Notify on signatures"
              name="signatures"
              //   value={selectedValue}
              //   onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              row
            />
          </Grid>

          {/* Allow modifications */}
          <Grid xs={12}>
            <CRadioGroup
              label="Allow modifications"
              name="modifications"
              //   value={selectedValue}
              //   onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ]}
              row
            />
          </Grid>

          {/* Redirect url */}
          <Grid xs={12}>
            <CInput label="Redirect url" value={redirectUrl} onChange={setRedirectUrl} />
          </Grid>
        </Grid>
      </SubCard>

      {/* // Custom dialog for adding a new contact */}
      <CustomDialog
        open={openBcc}
        onClose={() => setOpenBcc(false)}
        title="Add contact"
        successButtonText="Submit"
        cancelButtonText="Reset"
      >
        <AddContact />
      </CustomDialog>
    </Box>
  );
};
