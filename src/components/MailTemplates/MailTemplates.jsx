import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CBasicTable from '../../ui-component/CBasicTable/CBasicTable';
import { Stack, Switch } from '@mui/material';
import CButton from '../../ui-component/CButton/CButton';
import { PlusIcon } from 'lucide-react';
import { Message, MoreVert } from '@mui/icons-material';
import CDropDownMenu from '../../ui-component/CDropDownMenu/CDropDownMenu';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import TourContentWithBtn from '../../ui-component/TourContentWithBtn';
import Tour from 'reactour';

const MailTemplates = () => {
  const { t } = useTranslation();

  const [isTourOpen, setIsTourOpen] = React.useState(false);
  const [tourData, setTourData] = React.useState(null);

  const closeTour = () => {
    setIsTourOpen(false);
    setTourData(null);
  };

  const handleDontShow = (isChecked) => {
    if (!isChecked) {
      setTourData(null);
    }
  };

  React.useEffect(() => {
    setIsTourOpen(true);
    const tourConfig = [
      {
        selector: '[data-tut=reactourFirst]',
        content: () => (
          <TourContentWithBtn message={t('tour-mssg.report-1')} isChecked={handleDontShow} />
        ),
        position: 'top',
        style: { fontSize: '13px' },
      },
      {
        selector: '[data-tut=reactourSecond]',
        content: () => (
          <TourContentWithBtn message={t('tour-mssg.redirect')} isChecked={handleDontShow} />
        ),
        position: 'top',
        style: { fontSize: '13px' },
      },
      {
        selector: '[data-tut=reactourThird]',
        content: () => (
          <TourContentWithBtn message={t('tour-mssg.bulksend')} isChecked={handleDontShow} />
        ),
        position: 'top',
        style: { fontSize: '13px' },
      },
      {
        selector: '[data-tut=reactourFourth]',
        content: () => (
          <TourContentWithBtn message={t('tour-mssg.option')} isChecked={handleDontShow} />
        ),
        position: 'top',
        style: { fontSize: '13px' },
      },
    ];
    setTourData(tourConfig);
  }, [t]);

  const menuItems = [
    { label: 'Edit', onClick: () => console.log('Settings') },
    { label: 'Rename', onClick: () => console.log('Log out') },
    { label: 'Copy Template Id', onClick: () => console.log('Log out') },
    { label: 'Copy Public URL', onClick: () => console.log('Log out') },
    { label: 'Duplicate', onClick: () => console.log('Log out') },
    { label: 'Delete', onClick: () => console.log('Log out') },
  ];

  const columns = [
    { headerName: 'Title', field: 'title' },
    { headerName: 'File', field: 'file' },
    { headerName: 'Owner', field: 'owner' },
    { headerName: 'Signers', field: 'signers' },
    { headerName: 'Public', field: 'public' },
    { headerName: '', field: 'actions' },
  ];

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
      public: <Switch />,
      actions: (
        <Stack spacing={1} direction="row">
          <CButton
            label="USE"
            startIcon={<PlusIcon size={16} />}
            size="small"
            data-tut="reactourSecond"
          />
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
            data-tut="reactourThird"
          />
          <CDropDownMenu
            buttonContent={<MoreVert fontSize="small" />}
            items={menuItems}
            dataTut="reactourFourth"
          />
        </Stack>
      ),
    },
  ];

  return (
    <MainCard title="Mail Templates" secondary={<CreateMailTemplate />}>
      <CBasicTable columns={columns} rows={rows} />
      {tourData && (
        <Tour
          onRequestClose={closeTour}
          steps={tourData}
          isOpen={isTourOpen}
          closeWithMask={false}
        />
      )}
    </MainCard>
  );
};

export default MailTemplates;

const CreateMailTemplate = () => {
  const navigate = useNavigate();
  return (
    <>
      <CButton
        data-tut="reactourFirst"
        color="error"
        variant="outlined"
        label={<PlusIcon />}
        onClick={() => navigate('/sign/request-signature?manageTemplate=true')}
      />
    </>
  );
};
