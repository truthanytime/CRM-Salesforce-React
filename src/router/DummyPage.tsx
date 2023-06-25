import { FC } from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { mapAbsRoutePathToLabel } from 'core/utils';

const DummyPage: FC = () => {
  const { pathname } = useLocation();

  return (
    <Container maxWidth="lg">
      <h1>{mapAbsRoutePathToLabel(pathname)} Page - Coming Soon</h1>
    </Container>
  );
};

export default DummyPage;
