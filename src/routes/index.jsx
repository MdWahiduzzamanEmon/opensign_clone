import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const routeArray = [MainRoutes, AuthenticationRoutes];

const router = createBrowserRouter(routeArray, {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
