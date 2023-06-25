import { FC, useState, useEffect, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import { Contact } from 'store/contact/types';
import { useContact } from 'store/contact/hooks';
import { Loader } from 'components/Loader';
import { OptionValue } from 'core/types';
import { Container, ContactsSection, ContactsContainer } from './ui';
import { ContactModal } from './components';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { ContactsTable } from './components/ContactsTable';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { generatePath, useNavigate } from 'react-router-dom';

const ContactPage: FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { loading, error, contacts, getContacts } = useContact();

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('filterValue', filterValue);

  const toggleModal = () => {
    if (modalOpen && selectedContact) setSelectedContact(undefined);
    setModalOpen((prevState) => !prevState);
  };

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const regex = new RegExp(searchTerm, 'i');
    return contacts.reduce((acc, val) => {
      const contactFirstName = val.firstName;
      if (contactFirstName.match(regex)) acc.push({ label: contactFirstName, value: contactFirstName });
      return acc;
    }, [] as OptionValue<string>[]);
  }, [contacts, searchTerm]);

  // const data = useMemo(() => {
  //   if (!filterValue) return contacts;
  //   return contacts.filter((contact) => contact.contactFirstName === filterValue);
  // }, [contacts, filterValue]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Contact
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" marginTop={2.5}>
            <Box width="250px" marginRight={2}>
              <SearchDropdown
                id="search-contacts"
                placeholder="Search all deals..."
                options={suggestions}
                onSelect={(term) => setFilterValue(term)}
                onChange={(term) => setSearchTerm(term)}
              />
            </Box>
          </Box>
        </Grid>

        {/* {isAdmin && ( */}
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <SecondaryButton>Import</SecondaryButton>

          <PrimaryButton startIcon={<PlusIcon />} sx={{ marginLeft: 2 }} onClick={toggleModal}>
            Create contact
          </PrimaryButton>
        </Grid>
        {/* )} */}
      </Grid>

      <ContactsSection>
        {contacts.length > 0 ? (
          <ContactsTable
            contacts={contacts}
            setSelectedContact={(contact) => {
              navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, { id: String(contact.contactId) }));
              // setSelectedContact(contact);
              // toggleModal();
            }}
          />
        ) : (
          <>
            <ContactsContainer marginTop={1}>
              {/* {isAdmin && ( */}
              <>
                <ContactAvatarIcon />
                <Typography
                  variant="labelRegular12"
                  component="p"
                  sx={{ color: 'neutral.n400', my: 3, width: 240, textAlign: 'center' }}
                >
                  You don’t have any contacts yet.
                  <br /> Create first contact and to work with.
                </Typography>
                <PrimaryButton startIcon={<PlusIcon />} onClick={toggleModal}>
                  Create contact
                </PrimaryButton>
              </>
              {/* )} */}
            </ContactsContainer>
          </>
        )}
      </ContactsSection>

      <ContactModal open={modalOpen} toggleOpen={toggleModal} contact={selectedContact} />

      {!!error && (
        <Typography variant="caption" color="red">
          {typeof error === 'string' ? error : 'Something went wrong!'}
        </Typography>
      )}

      {loading && <Loader />}
    </Container>
  );
};

export default ContactPage;
