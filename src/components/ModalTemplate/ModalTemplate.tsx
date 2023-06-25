import { FC, ReactNode } from 'react';
import { Typography, IconButton } from '@mui/material';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/emailCircleBlue.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/chevronDown.svg';

import { Modal } from 'components/ui';
import { ModalTemplateContainer, ModalTemplateHeader, ModalIconTitle, ModalHeadButtonBox } from './ui';

type ModalIcon = 'email' | 'sms' | 'meeting' | 'task';

interface ModalTemplateProps {
  open: boolean;
  toggleOpen: () => void;
  icon?: ModalIcon;
  title: string;
  children: ReactNode;
}

const ModalTemplate: FC<ModalTemplateProps> = ({ open, toggleOpen, icon, title, children }) => {
  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalTemplateContainer sx={{ maxWidth: '1000px', p: 0 }}>
        <ModalTemplateHeader>
          <ModalIconTitle>
            {icon === 'email' && <EmailIcon />}
            <Typography variant="p16" sx={{ color: 'neutral.white' }}>
              {title}
            </Typography>
          </ModalIconTitle>

          <ModalHeadButtonBox>
            <IconButton>
              <ChevronDown />
            </IconButton>
            <IconButton onClick={toggleOpen}>
              <CrossIcon />
            </IconButton>
          </ModalHeadButtonBox>
        </ModalTemplateHeader>

        {children}
      </ModalTemplateContainer>
    </Modal>
  );
};

export default ModalTemplate;
