import { Typography } from '@mui/material';
import { FC } from 'react';
import { Container } from './ui';

const IntegrationOverview: FC = () => {
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {'Integration Overview'}
      </Typography>
    </Container>
  );
};

export default IntegrationOverview;
