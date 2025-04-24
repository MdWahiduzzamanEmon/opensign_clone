// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const users = {
  id: 'Users',
  title: 'Users',
  type: 'group',
  icon: icons.IconDashboard,
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
    //   icon: icons.IconDashboard
    }
  ]
};

export default users;
