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
      url: '/signature_status/in-progress'
      //   icon: icons.IconBrandChrome
    },
    {
      id: 'Completed',
      title: 'Completed',
      type: 'item',
      url: '/signature_status/completed'
    },
    {
      id: 'Drafts',
      title: 'Drafts',
      type: 'item',
      url: '/signature_status/drafts'
    },
    {
      id: 'Declined',
      title: 'Declined',
      type: 'item',
      url: '/signature_status/declined'
    },
    {
      id: 'Expired',
      title: 'Expired',
      type: 'item',
      url: '/signature_status/expired'
    }
  ]
};

export default signature_status;
