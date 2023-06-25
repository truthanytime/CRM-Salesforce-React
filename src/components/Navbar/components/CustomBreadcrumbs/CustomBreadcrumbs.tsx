import { FC } from 'react';
import { Breadcrumbs } from '@mui/material';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { matchPath, useNavigate } from 'react-router-dom';

import { ReactComponent as ChevronRightIcon } from 'assets/icons/chevronRight.svg';
import { dashboardRoutes } from 'router/routes';
import { mapAbsRoutePathToLabel } from 'core/utils';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { Container, Link, Separator } from './ui';
import { DropdownMenu } from '../DropdownMenu';
import { useContact } from 'store/contact/hooks';
import { useAccount } from 'store/account/hooks';
import { useDeal } from 'store/deal/hooks';

const CustomBreadcrumbs: FC = () => {
  const breadcrumbs = useBreadcrumbs(dashboardRoutes);
  const navigate = useNavigate();
  const { contact } = useContact();
  const { account } = useAccount();
  const { deal } = useDeal();

  return (
    <Container>
      <Breadcrumbs
        separator={
          <Separator>
            <ChevronRightIcon />
          </Separator>
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs.slice(1).map((breadcrumb) => {
          const path = breadcrumb.key;
          let label = mapAbsRoutePathToLabel(breadcrumb.key);
          const pathname = breadcrumb.location.pathname;
          const active = path === pathname;

          // Contact Name
          if (matchPath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, breadcrumb.key)) {
            label = (contact?.firstName ?? '') + ' ' + (contact?.lastName ?? '');
          }
          // Account Name
          if (matchPath(PRIVATE_ABS_ROUTE_PATHS.accountDetail, breadcrumb.key)) {
            label = account?.accountName ?? '';
          }
          // Deal Name
          if (matchPath(PRIVATE_ABS_ROUTE_PATHS.dealScapeDetail, breadcrumb.key)) {
            label = deal?.dealName ?? '';
          }
          if (path === PRIVATE_ABS_ROUTE_PATHS.lightSquare) {
            return (
              <DropdownMenu
                key={path}
                label={label}
                active={active}
                items={[
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.dashboard),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.dashboard),
                    active: PRIVATE_ABS_ROUTE_PATHS.dashboard === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.goalsMilestones),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.goalsMilestones),
                    active: PRIVATE_ABS_ROUTE_PATHS.goalsMilestones === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.forecast),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.forecast),
                    active: PRIVATE_ABS_ROUTE_PATHS.forecast === pathname,
                  },
                  {
                    label: mapAbsRoutePathToLabel(PRIVATE_ABS_ROUTE_PATHS.revenueSimulation),
                    onClick: () => navigate(PRIVATE_ABS_ROUTE_PATHS.revenueSimulation),
                    active: PRIVATE_ABS_ROUTE_PATHS.revenueSimulation === pathname,
                  },
                ]}
              />
            );
          }

          return (
            <Link key={path} onClick={() => navigate(path)} active={active}>
              {label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Container>
  );
};

export default CustomBreadcrumbs;
