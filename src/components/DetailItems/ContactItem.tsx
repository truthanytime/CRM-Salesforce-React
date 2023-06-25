import { Divider, Typography } from '@mui/material';
import { CustomSelect } from 'components/CustomSelect';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { FC } from 'react';
import { Contact } from 'store/contact/types';
import { ContactContainer } from './ui';

interface ContactItemProps {
  item: Contact;
}

const ContactItem: FC<ContactItemProps> = ({ item }) => {
  return (
    <>
      <ContactContainer>
        <TitleContainer label="Contact Name" icon="user">
          <CustomSelect<number>
            value={item?.contactId ?? 0}
            options={[{ label: `${item?.firstName} ${item?.lastName}`, value: item?.contactId ?? 0 }]}
          />
        </TitleContainer>
        <TitleContainer label="Work email">
          <Typography variant="p14">{item?.contactInfo?.email ?? '-'}</Typography>
        </TitleContainer>
        <TitleContainer label="Phone number" icon="phone">
          <Typography variant="p14">{item?.contactInfo?.phoneNumber ?? '-'}</Typography>
        </TitleContainer>
      </ContactContainer>
      <Divider />
    </>
  );
};

export default ContactItem;
