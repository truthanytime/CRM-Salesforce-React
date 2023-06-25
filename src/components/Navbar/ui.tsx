import { styled, AppBar as MuiAppBar, Box, Button as MuiButton, IconButton as MuiIconButton } from '@mui/material';

import { NAV_BAR_HEIGHT } from 'core/constants';

export const AppBar = styled(MuiAppBar)(({ theme }) => ({
  height: NAV_BAR_HEIGHT,
  backgroundColor: theme.palette.neutral.darkBlueHigh,
  '& .MuiToolbar-root': {
    minHeight: NAV_BAR_HEIGHT,
  },
  zIndex: theme.zIndex.drawer + 1,
}));

export const LeftContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
}));

export const RightContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginLeft: theme.spacing(3),
  height: '100%',
}));

export const Button = styled(MuiButton)(({ theme }) => ({
  ...theme.typography.p14,
  color: theme.palette.common.white,
  padding: '6px 12px',
  ':hover': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
  },
  ':disabled': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
  },
  ':active': {
    backgroundColor: 'transparent',
  },
}));

export const IconButton = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== 'hoverEnabled',
})<{ hoverEnabled?: boolean }>(({ theme, hoverEnabled = false }) => ({
  borderRadius: 0,
  padding: 4,
  '& svg path': {
    stroke: theme.palette.neutral.white,
  },
  ':hover': {
    backgroundColor: hoverEnabled ? theme.palette.neutral.darkBlueMedium : 'none',
  },
}));

export const NavLogoButton = styled(MuiIconButton)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export const AvatarMenuHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBlock: theme.spacing(1),
}));

export const AvatarMenuFooter = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  '& svg': {
    width: 56,
    height: 56,
  },
  width: 56,
  height: 56,
  borderRadius: 28,
  marginRight: theme.spacing(2),
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    top: '50%',
    marginTop: -8,
    width: 1,
    backgroundColor: theme.palette.primary.subtone320,
  },
}));
