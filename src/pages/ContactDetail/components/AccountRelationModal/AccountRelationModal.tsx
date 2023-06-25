import { FC, useState, useMemo } from 'react';
import { Typography, Divider, IconButton, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalFooter, ModalHeader, ModalMain, TextButton } from 'components/ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';
import { useAccount } from 'store/account/hooks';

interface AccountRelationModalProps {
  open: boolean;
  toggleOpen: () => void;
  onSelect: (id: number) => void;
}

const AccountRelationModal: FC<AccountRelationModalProps> = ({ open, onSelect, toggleOpen }) => {
  const { accounts } = useAccount();
  const [accountId, setAccountId] = useState<number>(0);

  const contactSuggestions = useMemo(
    () =>
      accounts.map((acc) => {
        return { label: acc.accountName, value: acc.accountId } as OptionValue<number>;
      }),
    [accounts],
  );

  const handleSubmit = () => {
    onSelect(accountId);
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
            id="accountId"
            label="Contact"
            placeholder="Select the Contact"
            value={accountId}
            options={contactSuggestions}
            onSelect={(value) => setAccountId(value)}
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

export default AccountRelationModal;
