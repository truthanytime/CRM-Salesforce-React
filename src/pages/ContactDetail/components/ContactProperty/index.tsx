import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { BackToRoute, Container, DeleteButton, ProfileHead, PropertyContainer } from './ui';
import format from 'date-fns/format';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
// import { ReactComponent as ControlIcon } from 'assets/icons/controls.svg';
import { ReactComponent as ContactAvatarIcon } from 'assets/icons/contactAvatar.svg';
import { Divider, Typography } from '@mui/material';
import PopoverWrapper from 'components/PopoverWrapper';
import { DeleteModal } from 'components/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { Contact, ContactType, CONTACT_TYPE_OPTIONS } from 'store/contact/types';
import TitleContainer from 'components/TitileContainer/TitleContainer';
import { StyledDropDownPanel } from 'components/DropDownPanel';
import { CustomSelect } from 'components/CustomSelect';
import { useContact } from 'store/contact/hooks';
import { Loader } from 'components/Loader';
import { useEmail } from 'store/email/hooks';
import { OptionValue } from 'core/types';
import { getContactStages as getContactStagesApi } from 'http/contact/contactStage';
import { getContactStatuss as getContactStatussApi } from 'http/contact/contactStatus';
import { getContactSources as getContactSourcesApi } from 'http/contact/contactSource';
import { EditableDropDown } from 'components/Editable';
import { useAccount } from 'store/account/hooks';

const ContactProperty: FC = () => {
  const navigate = useNavigate();
  const { accounts } = useAccount();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [contStages, setContStages] = useState<OptionValue<number>[]>([]);
  const [contStatuss, setContStatuss] = useState<OptionValue<number>[]>([]);
  const [contSources, setContSources] = useState<OptionValue<number>[]>([]);

  const { loading, error, contact, updateContact, deleteContact } = useContact();
  const { connectedAccount, getConnectedAccount } = useEmail();

  const suggestions: OptionValue<number>[] = useMemo(() => {
    return accounts.map((acc, val) => {
      return { label: acc.accountName, value: acc.accountId };
    });
  }, [accounts]);

  useEffect(() => {
    getContactStagesApi().then((res) => {
      setContStages(
        res.map((stage) => {
          return { label: stage.contactStageName, value: stage.contactStageId };
        }),
      );
    });
    getContactStatussApi().then((res) => {
      setContStatuss(
        res.map((stage) => {
          return { label: stage.contactStatusName, value: stage.contactStatusId };
        }),
      );
    });
    getContactSourcesApi().then((res) => {
      setContSources(
        res.map((stage) => {
          return { label: stage.contactSourceName, value: stage.contactSourceId };
        }),
      );
    });
  }, []);

  useEffect(() => {
    getConnectedAccount();
  }, []);

  const toggleModalOpen = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  const handleDelete = async () => {
    contact && deleteContact(contact.contactId);
    toggleModalOpen();
    navigate(PRIVATE_ABS_ROUTE_PATHS.contacts);
  };

  const handleUpdate = (data: Partial<Contact>) => {
    contact && updateContact({ contactId: contact.contactId, data });
  };

  return (
    <Container>
      <BackToRoute to={PRIVATE_ABS_ROUTE_PATHS.contacts}>
        <ArrowLeft />
        {'Back to Contacts'}
      </BackToRoute>
      <ProfileHead>
        <ContactAvatarIcon />
        <div className="main-profile">
          <div className="main-profile-content">
            <Typography variant="p12">Name</Typography>
            <Typography variant="h3">
              {contact?.firstName ?? ''} {contact?.lastName ?? ''}
            </Typography>
          </div>
          <PopoverWrapper icon={<DotsIcon />}>
            <DeleteButton startIcon={<DeleteIcon />} onClick={() => setModalOpen(true)}>
              {'Delete contact'}
            </DeleteButton>
          </PopoverWrapper>
          <DeleteModal
            open={modalOpen}
            toggleOpen={toggleModalOpen}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            entity={'contact'}
          />
        </div>
      </ProfileHead>

      <Divider sx={{ mx: 3 }} />

      <PropertyContainer>
        <StyledDropDownPanel title={'Core Information'}>
          <TitleContainer label="First Name">
            <Typography variant="p14">{contact?.firstName ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Middle Name">
            <Typography variant="p14">{contact?.middleName ?? '-' ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Last Name">
            <Typography variant="p14">{contact?.lastName ?? '-'}</Typography>
          </TitleContainer>

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

          <TitleContainer label="Title">
            <Typography variant="p14">{contact?.title ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Role">
            {/* <Typography variant="p14">{contact?.contactRole ?? '-'}</Typography> */}
          </TitleContainer>

          <TitleContainer label="Contact Source">
            <CustomSelect<number>
              value={contact?.contactSourceId ?? 0}
              options={contSources}
              onSelect={async (value) => handleUpdate({ contactSourceId: value })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Type">
            <CustomSelect<string>
              value={contact?.contactType ?? '-'}
              options={CONTACT_TYPE_OPTIONS}
              onSelect={async (value) => handleUpdate({ contactType: value as ContactType })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Status">
            <CustomSelect<number>
              value={contact?.contactStatusId ?? 0}
              options={contStatuss}
              onSelect={async (value) => handleUpdate({ contactStatusId: value })}
            />
          </TitleContainer>

          <TitleContainer label="Contact Stage">
            <CustomSelect<number>
              value={contact?.contactStageId ?? 0}
              options={contStages}
              onSelect={async (value) => handleUpdate({ contactStageId: value })}
            />
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Contact Information'}>
          <TitleContainer label="Primary Email">
            <Typography variant="p14">{contact?.contactInfo.email ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Phone Number">
            <Typography variant="p14">{contact?.contactInfo.phoneNumber ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Mobile Number">
            <Typography variant="p14">{contact?.contactInfo.mobileNumber ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'Address'}>
          <TitleContainer label="Street">
            <Typography variant="p14">{contact?.contactInfo.street ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="City">
            <Typography variant="p14">{contact?.contactInfo.city ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="State">
            <Typography variant="p14">{contact?.contactInfo.addressState ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Country">
            <Typography variant="p14">{contact?.contactInfo.country ?? '-'}</Typography>
          </TitleContainer>

          <TitleContainer label="Zip Code">
            <Typography variant="p14">{contact?.contactInfo.zip ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>

        <StyledDropDownPanel title={'System Information'}>
          <TitleContainer label="Created Date">
            <Typography variant="p14">
              {contact?.createDate ? format(new Date(contact?.createDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated on">
            <Typography variant="p14">
              {contact?.updateDate ? format(new Date(contact?.updateDate), 'PP') : '-'}
            </Typography>
          </TitleContainer>

          <TitleContainer label="Last Updated by" icon="user">
            <Typography variant="p14">{contact?.tenantUser?.userName ?? '-'}</Typography>
          </TitleContainer>
        </StyledDropDownPanel>
      </PropertyContainer>
      {loading && <Loader />}
      {/* <SecondaryButton>Enrich contact details</SecondaryButton> */}
    </Container>
  );
};

export default ContactProperty;