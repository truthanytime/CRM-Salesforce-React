import { FC } from 'react';
import { Box, Divider, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { ReactComponent as HamburguerMenuIcon } from 'assets/icons/hamburguerMenu.svg';
import { ReactComponent as NavLogoIcon } from 'assets/icons/navLogo.svg';
import { ReactComponent as BellNotificationIcon } from 'assets/icons/bellNotification.svg';
import { ReactComponent as UserAvatarIcon } from 'assets/icons/userAvatar.svg';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { useAuth } from 'store/auth/hooks';
import {
  AppBar,
  LeftContainer,
  RightContainer,
  IconButton,
  NavLogoButton,
  VerticalDivider,
  Button,
  AvatarContainer,
  AvatarMenuHead,
  AvatarMenuFooter,
} from './ui';
import { CustomBreadcrumbs } from './components';
import { LogoutButton } from '../LogoutButton';
import AvatarDropDown from './components/DropdownMenu/AvatarDropDownMenu';
import { AvatarMenuItem } from './components/DropdownMenu/ui';
import { useUser } from 'store/user/hooks';
import { mapUserRoleToLabel } from 'core/utils';
import { useTenant } from 'store/tenant/hooks';
interface NavbarProps {
  toggleDrawer: () => void;
}

const Navbar: FC<NavbarProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSuperAdmin } = useAuth();
  const { user } = useUser();
  const { tenant } = useTenant();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <LeftContainer>
          <IconButton onClick={toggleDrawer} sx={{ marginLeft: -0.5, marginRight: 0.5 }} hoverEnabled>
            <HamburguerMenuIcon />
          </IconButton>

          <NavLogoButton onClick={() => navigate(PRIVATE_ROUTE_PATHS.home)}>
            <NavLogoIcon />
          </NavLogoButton>

          <CustomBreadcrumbs />
        </LeftContainer>

        <RightContainer marginRight="10px">
          <IconButton sx={{ padding: 0 }}>
            <SearchIcon />
          </IconButton>

          <VerticalDivider />

          <IconButton sx={{ padding: 0 }}>
            <BellNotificationIcon />
          </IconButton>

          <AvatarDropDown avatarIcon={<UserAvatarIcon />} label={user?.userName ?? ''}>
            <AvatarMenuHead>
              <AvatarContainer>
                <UserAvatarIcon />
              </AvatarContainer>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="p14">{user?.userName}</Typography>
                <Typography variant="p12">{user?.userEmail}</Typography>
              </Box>
            </AvatarMenuHead>
            <AvatarMenuItem>
              <Link to={'#'}>{'Profile & Preferences'}</Link>
            </AvatarMenuItem>
            <Divider />
            {!!user && <AvatarMenuItem>{mapUserRoleToLabel(user.userType)}</AvatarMenuItem>}
            <AvatarMenuItem>{tenant?.tenantName}</AvatarMenuItem>
            <Divider />
            <AvatarMenuFooter>
              <LogoutButton />
              <Typography variant="p12">
                <Link to={'#'}>{'Privacy Policy'}</Link>
              </Typography>
            </AvatarMenuFooter>
          </AvatarDropDown>

          {isSuperAdmin && !pathname.includes(PRIVATE_ROUTE_PATHS.myAccount) && (
            <Button onClick={() => navigate(PRIVATE_ROUTE_PATHS.myAccount)} sx={{ marginLeft: 2 }}>
              My account
            </Button>
          )}
        </RightContainer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
