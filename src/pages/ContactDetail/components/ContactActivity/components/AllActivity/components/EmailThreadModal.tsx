import { IconButton, Typography } from '@mui/material';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain } from 'components/ui';
import { FC } from 'react';
import { EmailData } from 'store/activity/types';
import EmailCard from './EmailCard';

interface Props {
  open: boolean;
  toggleOpen: () => void;
  mainEmailData: Partial<EmailData>;
  emailThreads: EmailData[];
}

const EmailThreadModal: FC<Props> = ({ open, mainEmailData, toggleOpen, emailThreads }) => {
  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer sx={{ maxWidth: 640 }}>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {mainEmailData.subject}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>
        <ModalMain>
          {emailThreads.map((email, index) => {
            return <EmailCard key={index} {...email} />;
          })}
        </ModalMain>
      </ModalContainer>
    </Modal>
  );
};

export default EmailThreadModal;
