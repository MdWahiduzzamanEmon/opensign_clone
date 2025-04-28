import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from '../components/PrivateRoutes/PrivateRoutes';
// import RequestSignature from '../components/Sign/RequestSignature/RequestSignature';
// import SignYourself from '../components/SignYourself/SignYourself';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

const SignYourself = Loadable(lazy(() => import('../components/Sign/SignYourself/SignYourself')));
const RequestSignature = Loadable(
  lazy(() => import('../components/Sign/RequestSignature/RequestSignature')),
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <PrivateRoutes>
      <MainLayout />
    </PrivateRoutes>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: 'sign',
      children: [
        {
          path: 'sign-your-self',
          element: <SignYourself />,
        },
        {
          path: 'request-signature',
          element: <RequestSignature />,
        },
        {
          path: 'need-your-sign',
          element: '',
        },
      ],
    },

    // url: '/templates/create-template',
    {
      path: 'templates',
      children: [
        {
          path: 'create-template',
          element: '',
        },
        {
          path: 'manage-templates',
          element: '',
        },
      ],
    },
    {
      path: 'signature_status',
      children: [
        {
          path: 'in-progress',
          element: '',
        },
        {
          path: 'completed',
          element: '',
        },
        {
          path: 'Drafts',
          element: '',
        },
        {
          path: 'Declined',
          element: '',
        },
        {
          path: 'Expired',
          element: '',
        },
      ],
    },
    {
      path: '/settings',
      children: [
        {
          path: 'my-signature',
          element: '',
        },
        {
          path: 'Preferences',
          element: '',
        },
        {
          path: 'mail-templates',
          element: '',
        },
      ],
    },
    {
      path: 'users',
      element: '',
    },
    {
      path: 'contact',
      element: '',
    },
  ],
};

export default MainRoutes;
