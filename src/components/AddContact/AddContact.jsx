import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material';
import React from 'react';
import CInput from '../../ui-component/Input/Input';

const AddContact = () => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    const { checked } = e.target;
    console.log('Switch checked:', checked);
  };

  return (
    <>
      <Box>
        <FormGroup onChange={handleSwitchChange}>
          <FormControlLabel control={<Switch color={'secondary'} />} label="Add Yourself" />
        </FormGroup>

        <CInput label="Name" required type="text" onChange={handleInputChange} value={data.name} />
        <CInput
          label="Email"
          required
          type="email"
          onChange={handleInputChange}
          value={data.email}
        />
        <CInput
          label="Phone"
          placeholder="Optional"
          onChange={handleInputChange}
          value={data.phone}
        />
      </Box>
    </>
  );
};

export default AddContact;
