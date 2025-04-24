// assets
import { IconDashboard } from '@tabler/icons-react';

// constant
const icons = { IconDashboard };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const sign = {
  id: 'sign',
  title: 'Sign',
  type: 'group',
  icon: icons.IconDashboard,
  children: [
    {
      id: 'signYourSelf',
      title: 'Sign Yourself',
      type: 'item',
      url: '/sign/sign-your-self',
      //   icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'need-your-sign',
      title: 'Need Your Sign',
      type: 'item',
      url: '/sign/need-your-sign',
      //   icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'requestSignature',
      title: 'Request Signature',
      type: 'item',
      url: '/sign/request-signature',
      //   icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default sign;
