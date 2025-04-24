// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const settings = {
  id: 'settings',
  title: 'Settings',
  type: 'group',
  icon: icons.IconDashboard,
  children: [
    {
      id: 'my-signature',
      title: 'My Signature',
      type: 'item',
      url: '/settings/my-signature'
      //   icon: icons.IconBrandChrome,
      //   breadcrumbs: false
    },
    {
      id: 'mail-templates',
      title: 'Mail Templates',
      type: 'item',
      url: '/settings/mail-templates'
    },
    {
      id: 'Preferences',
      title: 'Preferences',
      type: 'item',
      url: '/settings/preferences' //   icon: icons.IconBrandChrome
    }
  ]
};

export default settings;
