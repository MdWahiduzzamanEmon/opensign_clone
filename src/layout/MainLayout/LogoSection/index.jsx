import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
// import { DASHBOARD_PATH } from 'config';
// import Logo from 'ui-component/Logo';
import { APP_NAME } from '../../../config';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link
      component={RouterLink}
      to={'/'}
      aria-label="theme-logo"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'text.primary',
        '& svg': {
          width: 40,
          height: 40
        },
        '& h2': {
          fontSize: '1.5rem',
          fontWeight: 700,
          marginLeft: 1
        },
        '& small': {
          fontSize: '0.875rem',
          marginLeft: 1
        }
      }}
      color="inherit"
      underline="none"
    >
      {/* <Logo /> */}
      <h2>{APP_NAME}</h2>
    </Link>
  );
}
