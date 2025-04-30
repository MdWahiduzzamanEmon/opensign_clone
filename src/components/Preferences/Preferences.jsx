import React, { lazy } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { APP_NAME } from '../../config';
import { Tab, Tabs } from '@mui/material';
import { Settings } from 'lucide-react';
import Loadable from 'ui-component/Loadable';
import { Email, Security } from '@mui/icons-material';
import { Show } from 'easy-beauty-components---react';
// import Security from './Security/Security';
// import EmailTemplateEditor from './EmailTemplateEditor/EmailTemplateEditor';
// import General from './General/General';
const General = Loadable(lazy(() => import('./General/General')));
const EmailTemplateEditor = Loadable(
  lazy(() => import('./EmailTemplateEditor/EmailTemplateEditor')),
);
const SecurityComponent = Loadable(lazy(() => import('./Security/Security')));

const TAB_ITEMS = [
  { label: 'General', value: 0, icon: <Settings /> },
  { label: 'Email', value: 1, icon: <Email /> },
  { label: 'Security', value: 2, icon: <Security /> },
];

const Preferences = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard title={`${APP_NAME} Preferences`}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="preferences tabs"
        aria-labelledby="preferences-tabs"
      >
        {TAB_ITEMS?.map((item) => (
          <Tab key={item.value} label={item.label} icon={item.icon} iconPosition="start" />
        ))}
      </Tabs>

      <Show when={value === 0}>
        <General />
      </Show>
      <Show when={value === 1}>
        <EmailTemplateEditor />
      </Show>
      <Show when={value === 2}>
        <SecurityComponent />
      </Show>
    </MainCard>
  );
};

export default Preferences;
