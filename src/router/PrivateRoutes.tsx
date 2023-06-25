import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { useUser } from 'store/user/hooks';
import { dashboardRoutes, renderRoute, profileRoutes } from './routes';
import { PanelLayout } from 'components/PanelLayout';

const PrivateRoutes: FC = () => {
  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      {dashboardRoutes.map(renderRoute)}

      {profileRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      <Route path="*" element={<Navigate to={PRIVATE_ROUTE_PATHS.home} replace />} />
    </Routes>
  );
};

export default PrivateRoutes;
