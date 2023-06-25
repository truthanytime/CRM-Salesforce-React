import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useAuth } from 'store/auth/hooks';
import ScrollToTop from './ScrollToTop';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter: FC = () => {
  const { accessToken } = useAuth();

  return (
    <Router>
      <ScrollToTop />

      {accessToken ? <PrivateRoutes /> : <PublicRoutes />}
    </Router>
  );
};

export default AppRouter;
