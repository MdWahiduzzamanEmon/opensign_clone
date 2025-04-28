import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from '../components/PrivateRoutes/PrivateRoutes';
// import Drafts from '../components/SignatureStatus/Drafts/Drafts';
// import Declined from '../components/SignatureStatus/Declined/Declined';
// import Expired from '../components/SignatureStatus/Expired/Expired';

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
const NeedYourSign = Loadable(lazy(() => import('../components/Sign/NeedYourSign/NeedYourSign')));
const InProgress = Loadable(
  lazy(() => import('../components/SignatureStatus/InProgress/InProgress')),
);
const Completed = Loadable(lazy(() => import('../components/SignatureStatus/Completed/Completed')));
const Drafts = Loadable(lazy(() => import('../components/SignatureStatus/Drafts/Drafts')));
const Declined = Loadable(lazy(() => import('../components/SignatureStatus/Declined/Declined')));
const Expired = Loadable(lazy(() => import('../components/SignatureStatus/Expired/Expired')));

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
          element: <NeedYourSign />,
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
          element: <InProgress />,
        },
        {
          path: 'completed',
          element: <Completed />,
        },
        {
          path: 'Drafts',
          element: <Drafts />,
        },
        {
          path: 'Declined',
          element: <Declined />,
        },
        {
          path: 'Expired',
          element: <Expired />,
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
