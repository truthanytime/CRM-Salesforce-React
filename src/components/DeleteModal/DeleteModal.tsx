import { FC } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';

import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import {
  Modal,
  ModalContainer,
  ModalHeader,
  ModalMain,
  ModalFooter,
  TextButton,
  RedLoadingButton,
} from 'components/ui';
import { DeleteIconContainer } from './ui';

interface DeleteModalProps {
  open: boolean;
  entity?: string;
  pluralEntity?: string;
  loading: boolean;
  error: string | boolean;
  toggleOpen: () => void;
  onDelete: () => Promise<void>;
}

const DeleteModal: FC<DeleteModalProps> = ({ open, entity, pluralEntity, loading, error, toggleOpen, onDelete }) => {
  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer sx={{ maxWidth: '640px' }}>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            Delete {entity ?? pluralEntity}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Divider />

        <ModalMain
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '40px',
          }}
        >
          <DeleteIconContainer>
            <DeleteIcon />
          </DeleteIconContainer>

          <Typography variant="p14" sx={{ width: '45%', textAlign: 'center', marginTop: 3, color: 'neutral.main' }}>
            Are you sure you want to delete {entity ? `this ${entity}` : `these ${pluralEntity}`}?
          </Typography>

          {!!error && (
            <Typography variant="p12" sx={{ marginTop: 3, color: 'red.main' }}>
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </Typography>
          )}
        </ModalMain>

        <Divider />

        <ModalFooter>
          <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
            Cancel
          </TextButton>

          <RedLoadingButton loading={loading} onClick={() => onDelete()}>
            Delete {entity ?? pluralEntity}
          </RedLoadingButton>
        </ModalFooter>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteModal;
