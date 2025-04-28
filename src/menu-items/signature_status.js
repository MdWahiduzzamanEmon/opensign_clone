// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const signature_status = {
  id: 'signature_status',
  title: 'Signature Status',
  type: 'group',
  icon: icons.IconDashboard,
  children: [
    {
      id: 'In Progress',
      title: 'In Progress',
      type: 'item',
      url: '/signature_status/in-progress',
      breadcrumbs: false,
      //   icon: icons.IconBrandChrome
    },
    {
      id: 'Completed',
      title: 'Completed',
      type: 'item',
      url: '/signature_status/completed',
      breadcrumbs: false,
    },
    {
      id: 'Drafts',
      title: 'Drafts',
      type: 'item',
      url: '/signature_status/drafts',
      breadcrumbs: false,
    },
    {
      id: 'Declined',
      title: 'Declined',
      type: 'item',
      url: '/signature_status/declined',
      breadcrumbs: false,
    },
    {
      id: 'Expired',
      title: 'Expired',
      type: 'item',
      url: '/signature_status/expired',
      breadcrumbs: false,
    },
  ],
};

export default signature_status;
