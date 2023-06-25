import { FC } from 'react';
import { ActionButton, Container, VirticalDivider } from './ui';
import { ReactComponent as CheckCircleIcon } from 'assets/icons/checkCircleBlue.svg';
import { ReactComponent as EditCircleIcon } from 'assets/icons/editCircleBlue.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as CameraIcon } from 'assets/icons/camera.svg';

const ActivityToolBar: FC = () => (
  <Container>
    <ActionButton startIcon={<CheckCircleIcon />}>Note</ActionButton>
    <ActionButton startIcon={<EditCircleIcon />}>Task</ActionButton>
    <VirticalDivider />
    <ActionButton startIcon={<EmailIcon />}>Email</ActionButton>
    <ActionButton startIcon={<CameraIcon />}>Meeting</ActionButton>
  </Container>
);

export default ActivityToolBar;
