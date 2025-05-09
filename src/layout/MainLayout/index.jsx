import { useEffect, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContentStyled from './MainContentStyled';
import Customization from '../Customization';
import Loader from 'ui-component/Loader';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { useTranslation } from 'react-i18next';
import { pdfjs } from 'react-pdf';

// ==============================|| MAIN LAYOUT ||============================== //

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function MainLayout() {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { borderRadius, miniDrawer } = useConfig();
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  useEffect(() => {
    handlerDrawerOpen(!miniDrawer);
  }, [miniDrawer]);

  useEffect(() => {
    downMD && handlerDrawerOpen(false);
  }, [downMD]);

  useEffect(() => {
    const language = localStorage.getItem('i18nextLng');
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  // horizontal menu-list bar : drawer

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: 'background.default' }}
      >
        <Toolbar sx={{ p: 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      <Sidebar />

      {/* main content */}
      <MainContentStyled {...{ borderRadius, open: drawerOpen }}>
        <Box
          sx={{
            ...{ px: { xs: 0 } },
            minHeight: 'calc(100vh - 128px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* breadcrumb */}
          <Breadcrumbs />
          <Outlet />
          {/* <Footer /> */}
        </Box>
      </MainContentStyled>
      {/* <Customization /> */}
    </Box>
  );
}
