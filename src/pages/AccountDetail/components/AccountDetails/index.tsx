import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, useEffect, useState } from 'react';
import { Container } from './ui';
import { ContactItem, DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';
import { useAccount } from 'store/account/hooks';
import ContactRelationModal from '../ContactRelationModal/ContactRelationModal';
import { Contact } from 'store/contact/types';
import { useContact } from 'store/contact/hooks';

const AccountDetails: FC = () => {
  const { account, getAccount } = useAccount();
  const { updateContact } = useContact();
  const [openAddContact, setOpenAddContact] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenAddContact((prevState: boolean) => !prevState);
  };

  const handleAddContact = async (id: number) => {
    const data: Partial<Contact> = { accountId: account?.accountId };
    toggleModal();
    await updateContact({ contactId: id, data });
    getAccount(account?.accountId ?? 0);
  };

  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <DealItem />
        <DealItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add new Deal</CustomIconButton>
      </DropDownPanel>

      <DropDownPanel title={'Contacts'}>
        {account?.contacts?.map((contact) => (
          <ContactItem key={contact.contactId} item={contact} />
        ))}
        <CustomIconButton startIcon={<PlusIcon />} onClick={() => toggleModal()}>
          Add new Contact
        </CustomIconButton>
      </DropDownPanel>
      <ContactRelationModal open={openAddContact} toggleOpen={() => toggleModal()} onSelect={handleAddContact} />
    </Container>
  );
};

export default AccountDetails;
