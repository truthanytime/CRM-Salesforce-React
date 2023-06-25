import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PUBLIC_ABS_ROUTE_PATHS } from 'core/constants';
import { Login, CreatePassword, ResetPassword } from 'pages';

const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ABS_ROUTE_PATHS.login} element={<Login />} />
      <Route path={PUBLIC_ABS_ROUTE_PATHS.resetPassword} element={<ResetPassword />} />
      <Route path={PUBLIC_ABS_ROUTE_PATHS.createPassword}>
        <Route index element={<CreatePassword />} />
        <Route path=":token" element={<CreatePassword />} />
      </Route>
      <Route path="*" element={<Navigate to={PUBLIC_ABS_ROUTE_PATHS.login} replace />} />
    </Routes>
  );
};

export default PublicRoutes;
