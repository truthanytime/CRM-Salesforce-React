import { FC } from 'react';

import { useAuth } from 'store/auth/hooks';
import { SuperAdmin } from './components/SuperAdmin';
import { Admin } from './components/Admin';

const Dashboard: FC = () => {
  const { isSuperAdmin } = useAuth();

  return isSuperAdmin ? <SuperAdmin /> : <Admin />;
};

export default Dashboard;
