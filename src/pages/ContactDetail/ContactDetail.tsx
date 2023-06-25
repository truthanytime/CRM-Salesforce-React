import { FC, useEffect } from 'react';
import { Container } from './ui';

import { useParams } from 'react-router-dom';
import { ContactActivity, ContactDetails, ContactProperty } from './components';
import { useIntegration } from 'store/integration/hooks';
import { useAccount } from 'store/account/hooks';
import { useContact } from 'store/contact/hooks';

const ContactDetailPage: FC = () => {
  const { integration, getIntegration } = useIntegration();

  useEffect(() => {
    getIntegration('gmail');
  }, []);

  const { id } = useParams();
  const contactId = Number(id);
  const { getAccounts } = useAccount();
  const { getContact } = useContact();

  useEffect(() => {
    getAccounts();
    getContact(contactId);
  }, [contactId, getContact, getAccounts]);

  return (
    <Container>
      <ContactProperty />

      <ContactActivity />

      <ContactDetails />
    </Container>
  );
};

export default ContactDetailPage;