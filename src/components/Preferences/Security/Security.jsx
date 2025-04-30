import { Box, Typography } from '@mui/material';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CButton from '../../../ui-component/CButton/CButton';
import { Security } from '@mui/icons-material';
import { Fingerprint } from 'lucide-react';

const SecurityCom = () => {
  return (
    <MainCard title="Security">
      {/* //2FA */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" mb={2}>
          Two-Factor Authentication
        </Typography>
        <Typography variant="body1" mb={2}>
          Protect your account with two-factor authentication. When enabled, you'll need to enter a
          code from your authenticator app whenever you sign in.
        </Typography>

        <CButton label="Setup 2FA" startIcon={<Security />} />
      </Box>

      {/* passkey */}
      <Box>
        <Typography variant="h4" mb={2}>
          Passkey Authentication
        </Typography>
        <Typography variant="body1" mb={2}>
          Passkeys provide a stronger, phishing-resistant alternative to passwords. You can use your
          fingerprint, face recognition, or device PIN to sign in securely.
        </Typography>

        <CButton label="Setup 2FA" startIcon={<Fingerprint />} />
      </Box>
    </MainCard>
  );
};

export default SecurityCom;
