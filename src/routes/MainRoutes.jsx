import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from '../components/PrivateRoutes/PrivateRoutes';
// import MailTemplates from '../components/MailTemplates/MailTemplates';

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
const ManageSign = Loadable(lazy(() => import('../components/Settings/ManageSign/ManageSign')));
const Preferences = Loadable(lazy(() => import('../components/Preferences/Preferences')));

const MailTemplates = Loadable(lazy(() => import('../components/MailTemplates/MailTemplates')));

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
          element: <ManageSign />,
        },
        {
          path: 'Preferences',
          element: <Preferences />,
        },
        {
          path: 'mail-templates',
          element: <MailTemplates />,
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
