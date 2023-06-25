import { FC, useState, MouseEvent } from 'react';
import { ListItemText, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as MenuHomeIcon } from 'assets/icons/menuHome.svg';
import { ReactComponent as MenuContactsIcon } from 'assets/icons/menuContacts.svg';
import { ReactComponent as MenuAccountsIcon } from 'assets/icons/menuAccounts.svg';
import { ReactComponent as MenuProductIcon } from 'assets/icons/menuProduct.svg';
import { ReactComponent as MenuFunnelIcon } from 'assets/icons/menuFunnel.svg';
import { ReactComponent as MenuDealIcon } from 'assets/icons/menuDeal.svg';
import { ReactComponent as MenuTowerIcon } from 'assets/icons/menuTower.svg';
import { ReactComponent as MenuIntegrationIcon } from 'assets/icons/menuIntegration.svg';
import { ReactComponent as MenuLightSquareIcon } from 'assets/icons/menuLightSquare.svg';
import { ReactComponent as MenuDataRaptorIcon } from 'assets/icons/menuDataRaptorIcon.svg';

import { ReactComponent as DotsIcon } from 'assets/icons/dots.svg';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { ReactComponent as OutlineSunIcon } from 'assets/icons/outlineSun.svg';
import { ReactComponent as OutlineMoonIcon } from 'assets/icons/outlineMoon.svg';
import { NavRoute } from 'router/types';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import {
  Drawer,
  ListItem,
  ListItemIcon,
  ToggleButtonGroup,
  ToggleButton,
  ThemeIcon,
  BottomContainer,
  MainListContainer,
} from './ui';
import { MenuItem } from './components';

const routeList: NavRoute[] = [
  { name: 'Home', path: PRIVATE_ABS_ROUTE_PATHS.home, Icon: <MenuHomeIcon /> },
  { name: 'Contacts', path: PRIVATE_ABS_ROUTE_PATHS.contacts, Icon: <MenuContactsIcon /> },
  { name: 'Accounts', path: PRIVATE_ABS_ROUTE_PATHS.accounts, Icon: <MenuAccountsIcon className="path-fill" /> },
  {
    name: 'Product Definer',
    path: PRIVATE_ABS_ROUTE_PATHS.productDefiner,
    Icon: <MenuProductIcon />,
    notifications: 1,
  },
  { name: 'Hyper Funnel', path: PRIVATE_ABS_ROUTE_PATHS.hyperFunnel, Icon: <MenuFunnelIcon />, notifications: 1 },
  { name: 'Deal Scape', path: PRIVATE_ABS_ROUTE_PATHS.dealScape, Icon: <MenuDealIcon /> },
  { name: 'Control Tower', path: PRIVATE_ABS_ROUTE_PATHS.controlTower, Icon: <MenuTowerIcon /> },
  { name: 'Integration', path: PRIVATE_ABS_ROUTE_PATHS.integration, Icon: <MenuIntegrationIcon /> },
  { name: 'Data Raptor', path: PRIVATE_ABS_ROUTE_PATHS.dataRaptor, Icon: <MenuDataRaptorIcon /> },
  {
    name: 'LightSquare',
    path: PRIVATE_ABS_ROUTE_PATHS.lightSquare,
    Icon: <MenuLightSquareIcon />,
    nestedRoutes: [
      { name: 'Dashboard', path: PRIVATE_ABS_ROUTE_PATHS.dashboard },
      { name: 'Goals and Milestones', path: PRIVATE_ABS_ROUTE_PATHS.goalsMilestones },
      { name: 'Forecast', path: PRIVATE_ABS_ROUTE_PATHS.forecast },
      { name: 'Revenue Simulation', path: PRIVATE_ABS_ROUTE_PATHS.revenueSimulation },
    ],
  },
];

interface DrawerComponentProps {
  open: boolean;
  toggleOpen: () => void;
}

const DrawerComponent: FC<DrawerComponentProps> = ({ open, toggleOpen }) => {
  const [activeTheme, setActiveTheme] = useState('light');
  const navigate = useNavigate();

  const handleChange = (event: MouseEvent<HTMLElement>, selectedTheme: string) => {
    setActiveTheme(selectedTheme);
  };

  const onNavigate = (path: string) => {
    navigate(path);
    toggleOpen();
  };

  return (
    <Drawer variant="temporary" open={open} onClose={toggleOpen}>
      <MainListContainer className="no-scrollbar">
        <List>
          {routeList.map((route) => (
            <MenuItem
              key={route.name}
              Icon={route.Icon}
              label={route.name}
              nestedItems={route.nestedRoutes}
              notifications={route.notifications}
              path={route.path}
              onClick={onNavigate}
            />
          ))}
        </List>
      </MainListContainer>

      <BottomContainer paddingTop={1}>
        <List>
          <ListItem nested onClick={() => onNavigate(PRIVATE_ABS_ROUTE_PATHS.more)}>
            <ListItemIcon>
              <DotsIcon />
            </ListItemIcon>
            <ListItemText primary="More" primaryTypographyProps={{ variant: 'p12' }} />
          </ListItem>

          <ListItem nested onClick={() => onNavigate(PRIVATE_ABS_ROUTE_PATHS.settings)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'p12' }} />
          </ListItem>
        </List>

        <ToggleButtonGroup color="primary" value={activeTheme} exclusive onChange={handleChange}>
          <ToggleButton value="light">
            <ThemeIcon>
              <OutlineSunIcon />
            </ThemeIcon>
            Light
          </ToggleButton>
          <ToggleButton value="dark">
            <ThemeIcon>
              <OutlineMoonIcon />
            </ThemeIcon>
            Dark
          </ToggleButton>
        </ToggleButtonGroup>
      </BottomContainer>
    </Drawer>
  );
};

export default DrawerComponent;
