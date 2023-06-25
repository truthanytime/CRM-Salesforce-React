import {
  styled,
  Box,
  Drawer as MuiDrawer,
  alpha,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemIcon,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from '@mui/material';

import { NAV_BAR_HEIGHT, DRAWER_MENU_WIDTH, DRAWER_MENU_BOTTOM_SECTION_HEIGHT } from 'core/constants';

export const Drawer = styled(MuiDrawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: DRAWER_MENU_WIDTH,
    backgroundColor: theme.palette.neutral.darkBlueHigh,
    paddingTop: NAV_BAR_HEIGHT,
  },
  '& .MuiBackdrop-root': {
    backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  },
}));

export const MainListContainer = styled(Box)(() => ({
  height: `calc(100% - ${DRAWER_MENU_BOTTOM_SECTION_HEIGHT}px)`,
  overflowY: 'auto',
}));

export const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => prop !== 'nested' && prop !== 'active',
})<{ nested?: boolean; active?: boolean }>(({ theme, nested = false, active = false }) => ({
  ...theme.typography.labelMedium14,
  height: nested ? 40 : 56,
  color: active ? theme.palette.neutral.white : theme.palette.neutral.n400,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  position: 'relative',
  backgroundColor: active && !nested ? theme.palette.neutral.darkBlueMedium : 'inherit',
  cursor: 'pointer',
  '&::before': {
    content: '" "',
    width: 4,
    height: nested ? 40 : 56,
    backgroundColor: nested ? 'inherit' : theme.palette.primary.main,
    position: 'absolute',
    left: 0,
    opacity: active ? 1 : 0,
  },
  '& svg:not(.path-fill) path': {
    stroke: active ? theme.palette.neutral.white : undefined,
  },
  '& svg.path-fill path': {
    fill: active ? theme.palette.neutral.white : undefined,
  },
  ':hover': {
    backgroundColor: nested ? 'inherit' : theme.palette.neutral.darkBlueMedium,
    color: theme.palette.neutral.white,
    '&::before': {
      opacity: 1,
    },
    '& svg:not(.path-fill) path': {
      stroke: theme.palette.neutral.white,
    },
    '& svg.path-fill path': {
      fill: theme.palette.neutral.white,
    },
  },
}));

export const ListItemIcon = styled(MuiListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'marginRight' && prop !== 'small',
})<{ marginRight?: number; small?: boolean }>(({ theme, marginRight, small }) => ({
  height: small ? 16 : 24,
  width: small ? 16 : 24,
  minWidth: small ? 16 : 24,
  marginRight: marginRight ?? theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const BottomContainer = styled(Box)(({ theme }) => ({
  height: DRAWER_MENU_BOTTOM_SECTION_HEIGHT,
  borderTop: `1px solid ${theme.palette.primary.subtone310}`,
}));

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

export const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  ...theme.typography.p12,
  flex: 1,
  height: 32,
  backgroundColor: theme.palette.neutral.darkBlueMedium,
  color: theme.palette.neutral.n200,
  textTransform: 'none',
  borderRadius: 4,
  ':hover, &.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.subtone310,
  },
  '&.Mui-selected': {
    borderRadius: 4,
    color: theme.palette.neutral.n200,
    backgroundColor: theme.palette.primary.subtone310,
  },
  ':not(:last-of-type)': {
    borderTopRightRadius: '4px !important',
    borderBottomRightRadius: '4px !important',
  },
}));

export const ThemeIcon = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  width: 16,
  height: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
