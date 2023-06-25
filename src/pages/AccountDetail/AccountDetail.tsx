import { FC, useEffect } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { AccountActivity, AccountDetails, AccountProperty } from './components';
import { getContactsByAccountId } from 'http/account/accountContact';
import { useAccount } from 'store/account/hooks';
import { useContact } from 'store/contact/hooks';

const AccountDetailPage: FC = () => {
  const { id } = useParams();
  const accountId = Number(id);
  const { getAccount } = useAccount();
  const { getContacts } = useContact();

  useEffect(() => {
    getAccount(accountId);
    getContacts();
  }, [accountId, getAccount, getContacts]);

  return (
    <Container>
      <AccountProperty />

      <AccountActivity />

      <AccountDetails />
    </Container>
  );
};

export default AccountDetailPage;
