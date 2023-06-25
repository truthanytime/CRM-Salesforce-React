import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC, useEffect, useMemo, useState } from 'react';
import { Container } from './ui';
import { DealItem } from 'components/DetailItems';
import { CustomIconButton } from 'components/ui';
import { useContact } from 'store/contact/hooks';
import { AccountContact } from 'http/account/accountContact';
import { CustomSelect } from 'components/CustomSelect';
import { useAccount } from 'store/account/hooks';
import { OptionValue } from 'core/types';
import { Contact } from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { EditableDropDown } from 'components/Editable';

const ContactDetails: FC = () => {
  const { contact, updateContact } = useContact();
  const { accounts, getAccounts } = useAccount();

  useEffect(() => {
    getAccounts();
  }, [contact]);

  const suggestions: OptionValue<number>[] = useMemo(() => {
    return accounts.map((acc, val) => {
      return { label: acc.accountName, value: acc.accountId };
    });
  }, [accounts]);

  const handleUpdate = (data: Partial<Contact>) => {
    contact && updateContact({ contactId: contact.contactId, data });
  };

  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <DealItem />
        <DealItem />
        <CustomIconButton startIcon={<PlusIcon />}>Add Deal</CustomIconButton>
      </DropDownPanel>

      <DropDownPanel title={'Account Relation'}>
        <EditableDropDown
          id="accountId"
          name="accountId"
          icon="account"
          options={suggestions}
          label="Account name"
          value={contact?.accountId ?? 0}
          fullWidth
          onSave={async (value) => handleUpdate({ accountId: value })}
        />
      </DropDownPanel>
    </Container>
  );
};

export default ContactDetails;
