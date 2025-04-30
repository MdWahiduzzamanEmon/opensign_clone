import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import SubCard from 'ui-component/cards/SubCard';
import CRadioGroup from '../../../ui-component/CRadioGroup/CRadioGroup';
import { DATE_FORMAT, TIME_ZONES } from '../../../constant/constant';
import CDropdownField from '../../../ui-component/DropdownField/DropdownField';
import CInput from '../../../ui-component/Input/Input';
import moment from 'moment/moment';

const General = () => {
  const [selectTimezone, setSelectTimezone] = React.useState({});
  const [selectDateFormat, setSelectDateFormat] = React.useState(DATE_FORMAT[0]);
  const [selectedValue, setSelectedValue] = React.useState('yes');
  const [redirectUrl, setRedirectUrl] = React.useState('');
  const [selectTimeFormat, setSelectTimeFormat] = React.useState('12');

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userTimezoneOption = TIME_ZONES.find((option) => option.value === userTimeZone);
  //   console.log('userTimezoneOption', userTimezoneOption);
  React.useEffect(() => {
    if (userTimezoneOption) {
      setSelectTimezone(userTimezoneOption);
    }
  }, [userTimezoneOption]);

  const timeFormatValue = (dateFormat, timeFormat) => {
    {
      /* 04/30/2025, 01:42:44 GMT +06:00 */
    }
    const date = moment().format(dateFormat);
    const time = moment().format(timeFormat === '12' ? 'hh:mm:ss A' : 'HH:mm:ss');
    const timezone = moment().format('z');
    const offset = moment().format('Z');
    return `${date}, ${time} ${timezone} ${offset}`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        justifyContent: 'space-between',
        gap: '1rem',
        alignItems: 'stretch', // important to stretch items vertically
        mt: 2,
      }}
    >
      <SubCard sx={{ flex: 1 }}>
        <Grid container rowGap={2} sx={{ mt: 2 }}>
          <Grid xs={12}>
            <CRadioGroup
              label="Allowed signature types"
              name="signatureTypes"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              options={[
                { value: 'draw', label: 'Draw' },
                { value: 'type', label: 'Type' },
                { value: 'upload', label: 'Upload' },
                { value: 'default', label: 'Default' },
              ]}
              disabledOptions={['disabled']}
              row
            />
          </Grid>

          <Grid xs={12}>
            <CRadioGroup
              label="Notify on signatures"
              name="signatureNotification"
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
            <CRadioGroup
              label="Enable tour"
              name="enableTour"
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
        </Grid>
      </SubCard>

      <SubCard sx={{ flex: 1 }}>
        <Grid container rowGap={2}>
          <Grid xs={12}>
            <CDropdownField
              label="Timezone"
              options={TIME_ZONES}
              value={selectTimezone}
              onChange={setSelectTimezone}
              placeholder="Select timezone"
            />
          </Grid>
          {/* Redirect url */}
          <Grid xs={12}>
            {/* DATE_FORMAT */}
            <CDropdownField
              label="Date format"
              options={DATE_FORMAT}
              value={selectDateFormat}
              onChange={setSelectDateFormat}
              placeholder="Select date format"
            />

            <CRadioGroup
              label=""
              name="timeFormat"
              value={selectTimeFormat}
              onChange={(e) => setSelectTimeFormat(e.target.value)}
              options={[
                { value: '12', label: '12 hour' },
                { value: '24', label: '24 hour' },
              ]}
              disabledOptions={['disabled']}
              row
              size="small"
            />

            <Typography variant="h5" mt={2}>
              {timeFormatValue(selectDateFormat?.value, selectTimeFormat)}
            </Typography>
          </Grid>
        </Grid>
      </SubCard>
    </Box>
  );
};

export default General;
