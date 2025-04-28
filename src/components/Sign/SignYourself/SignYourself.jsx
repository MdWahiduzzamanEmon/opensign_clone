import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CInput from '../../../ui-component/Input/Input';
import { useTranslation } from 'react-i18next';

const SignYourself = () => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState('');
  const [addYourself, setAddYourself] = React.useState(false);
  const [addOthers, setAddOthers] = React.useState(false);

  return (
    <>
      <MainCard
        title="Sign Yourself"
        subTitle="Use this form to sign the document yourself without adding others
"
      >
        <CInput
          label={t('email')}
          value={email}
          onChange={setEmail}
          required
          disabled={addYourself}
          id="email"
          type="email"
          onInvalidMessage={t('input-required')}
        />
      </MainCard>
    </>
  );
};

export default SignYourself;
