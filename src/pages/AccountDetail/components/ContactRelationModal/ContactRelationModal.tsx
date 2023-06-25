import { FC, useState, useMemo } from 'react';
import { Typography, Divider, IconButton, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalFooter, ModalHeader, ModalMain, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { CustomTextArea } from 'components/CustomTextarea';
import { generatePath, useNavigate } from 'react-router-dom';
import { CustomDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';
import { useContact } from 'store/contact/hooks';

interface ContactRelationModalProps {
  open: boolean;
  toggleOpen: () => void;
  onSelect: (id: number) => void;
}

const ContactRelationModal: FC<ContactRelationModalProps> = ({ open, onSelect, toggleOpen }) => {
  const { contacts } = useContact();
  const [contactId, setContactId] = useState<number>(0);

  const contactSuggestions = useMemo(
    () =>
      contacts.map((acc) => {
        return { label: `${acc.firstName} ${acc.lastName}`, value: acc.contactId } as OptionValue<number>;
      }),
    [contacts, contactId],
  );

  const handleSubmit = () => {
    onSelect(contactId);
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer sx={{ width: 600 }}>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {'Add Contact'}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Divider />
        <ModalMain>
          <CustomDropdown<number>
            id="contactId"
            label="Contact"
            placeholder="Select the Contact"
            value={contactId}
            options={contactSuggestions}
            onSelect={(value) => setContactId(value)}
            PaperComponent={Paper}
          />
        </ModalMain>
        <ModalFooter>
          <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
            Cancel
          </TextButton>

          <LoadingButton
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              handleSubmit();
            }}
            type="submit"
          >
            Confirm
          </LoadingButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default ContactRelationModal;
