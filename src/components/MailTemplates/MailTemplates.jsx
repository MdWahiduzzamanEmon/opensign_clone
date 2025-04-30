import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CBasicTable from '../../ui-component/CBasicTable/CBasicTable';
import { Stack, Switch } from '@mui/material';
import CButton from '../../ui-component/CButton/CButton';
import { PlusIcon } from 'lucide-react';
import { Message, MoreVert } from '@mui/icons-material';
import CDropDownMenu from '../../ui-component/CDropDownMenu/CDropDownMenu';
import { useNavigate } from 'react-router';

const MailTemplates = () => {
  const menuItems = [
    { label: 'Edit', onClick: () => console.log('Settings') },
    { label: 'Rename', onClick: () => console.log('Log out'), disabled: false },
    { label: 'Copy Template Id', onClick: () => console.log('Log out'), disabled: false },
    { label: 'Copy Public URL', onClick: () => console.log('Log out'), disabled: false },
    { label: 'Duplicate', onClick: () => console.log('Log out'), disabled: false },
    { label: 'Delete', onClick: () => console.log('Log out'), disabled: false },
  ];

  {
    /* Title	File	Owner	Signers	Public	 */
  }
  const columns = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'File', field: 'file' },
    { headerName: 'Owner', field: 'owner' },
    { headerName: 'Signers', field: 'signers' },
    { headerName: 'Public', field: 'public' },
    { headerName: '', field: 'actions' },
  ];

  //   Software Failures Reason
  // Download	MD.W. Emon	-

  const rows = [
    {
      id: 1,
      title: 'Software Failures Reason',
      file: (
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          Download
        </a>
      ),
      owner: 'MD.W. Emon',
      signers: '-',
      public: (
        <>
          <Switch />
        </>
      ),
      actions: (
        <Stack spacing={1} direction="row">
          {/* //use label button  */}
          <CButton label="USE" startIcon={<PlusIcon size={16} />} size="small" />
          {/* Bulk send */}
          <CButton
            label="Bulk send"
            size="small"
            startIcon={<Message size={16} />}
            sx={{
              backgroundColor: 'grey.700',
              color: 'white',
              '&:hover': {
                backgroundColor: 'grey.600',
              },
            }}
          />
          {/* vertical menu */}
          <CDropDownMenu buttonContent={<MoreVert fontSize="small" />} items={menuItems} />
        </Stack>
      ),
    },
  ];

  return (
    <MainCard title="Mail Templates" secondary={<CeateMailTemplate />}>
      <CBasicTable columns={columns} rows={rows} />
    </MainCard>
  );
};

export default MailTemplates;

const CeateMailTemplate = () => {
  const navigate = useNavigate();
  return (
    <CButton
      color="error"
      variant="outlined"
      label={<PlusIcon />}
      onClick={() => navigate('/sign/request-signature?manageTemplate=true')}
    />
  );
};
