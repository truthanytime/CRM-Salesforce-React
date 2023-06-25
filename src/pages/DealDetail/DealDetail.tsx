import { FC, useEffect } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { DealActivity, DealDetails, DealProperty } from './components';
import { useAccount } from 'store/account/hooks';
import { useContact } from 'store/contact/hooks';
import { useUser } from 'store/user/hooks';
import { useDeal } from 'store/deal/hooks';

const DealDetailPage: FC = () => {
  const { id: dealId } = useParams();

  const { getDeal } = useDeal();
  const { getAccounts } = useAccount();
  const { getContacts } = useContact();
  const { getUsers } = useUser();

  useEffect(() => {
    getDeal(Number(dealId));
    getAccounts();
    getContacts;
    getUsers();
  }, [dealId, getDeal, getAccounts, getUsers]);

  return (
    <Container>
      <DealProperty />

      <DealActivity />

      <DealDetails />
    </Container>
  );
};

export default DealDetailPage;
