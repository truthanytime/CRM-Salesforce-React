import { Typography } from '@mui/material';
import { FC } from 'react';
import { Container } from './ui';
import AllActivity from '../AllActivity';

const AccountActivity: FC = () => {
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {'Activity'}
      </Typography>

      <AllActivity />
    </Container>
  );
};

export default AccountActivity;
