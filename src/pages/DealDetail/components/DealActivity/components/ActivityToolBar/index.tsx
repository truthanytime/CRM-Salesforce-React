import { FC, useCallback, useState } from 'react';
import { ActionButton, Container, VirticalDivider } from './ui';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/checkCircleBlue.svg';
import { ReactComponent as EditCircleIcon } from 'assets/icons/editCircleBlue.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as CameraIcon } from 'assets/icons/camera.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { ReactComponent as SMSIcon } from 'assets/icons/sms.svg';
import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import EmailModal from '../EmailModal';

const ActivityToolBar: FC = () => {
  const [emailOpen, setEmailOpen] = useState<boolean>(false);

  const toggleEmailOpen = useCallback(() => {
    setEmailOpen((prevState) => !prevState);
  }, []);

  return (
    <Container>
      <ActionButton startIcon={<CheckCircleIcon />}>Note</ActionButton>
      <ActionButton startIcon={<EditCircleIcon />}>Task</ActionButton>
      <VirticalDivider />
      <ActionButton startIcon={<EmailIcon />} onClick={toggleEmailOpen}>
        Email
      </ActionButton>
      <ActionButton startIcon={<PhoneIcon />}>Call</ActionButton>
      <ActionButton startIcon={<SMSIcon />}>SMS</ActionButton>
      <ActionButton startIcon={<CameraIcon />}>Meeting</ActionButton>
      <ActionButton startIcon={<DotsIcon />} />
      <>
        <EmailModal open={emailOpen} toggleOpen={toggleEmailOpen} />
      </>
    </Container>
  );
};

export default ActivityToolBar;
