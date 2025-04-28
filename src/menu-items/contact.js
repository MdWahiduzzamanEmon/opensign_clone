// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const contact = {
  id: 'contact',
  //   title: 'Contact',
  type: 'group',
  icon: icons.IconDashboard,
  children: [
    {
      id: 'contact',
      title: 'Contact',
      type: 'item',
      url: '/contact',
      //   icon: icons.IconDashboard
    },
  ],
};

export default contact;
