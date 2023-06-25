import { Typography } from '@mui/material';
import { FC } from 'react';
import { Container } from './ui';
import { ActivityToolBar, AllActivity } from './components';

const ContactActivity: FC = () => {
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {'Activity'}
      </Typography>

      <AllActivity />

      <ActivityToolBar />
    </Container>
  );
};

export default ContactActivity;
