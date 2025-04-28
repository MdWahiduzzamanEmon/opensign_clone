import { Box, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import CInput from '../../ui-component/Input/Input';

const AddContact = () => {
  return (
    <>
      <Box>
        <RadioGroup name="use-radio-group" defaultValue="first">
          <MyFormControlLabel value="first" label="First" control={<Radio />} />
        </RadioGroup>

        <CInput label="Name" required type="text" />
        <CInput label="Email" required type="email" />
        <CInput label="Phone" placeholder="Optional" />
      </Box>
    </>
  );
};

export default AddContact;
