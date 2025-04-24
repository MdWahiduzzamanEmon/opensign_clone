// assets
import { IconDashboard } from '@tabler/icons-react';
import documents from './signature_status';
import settings from './settings';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  // title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }

    // {
    //   id: 'templates',
    //   title: 'Templates',
    //   type: 'collapse',
    //   icon: icons.IconDashboard,
    //   children: [
    //     {
    //       id: 'Create_Template',
    //       title: 'Create Template',
    //       type: 'item',
    //       url: '/templates/create-template',
    //       target: false
    //     },
    //     {
    //       id: 'Manage_Templates',
    //       title: 'Manage Templates',
    //       type: 'item',
    //       url: '/templates/manage-templates',
    //       target: false
    //     }
    //   ]
    // },
  ]
};

export default dashboard;
