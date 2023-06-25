import { styled, Box, Tab } from '@mui/material';

export const Container = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const IntegrationsSection = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  padding: '24px 32px',
}));

export const IntegrationsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkBg.main,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const TabItem = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  '&:hover': {
    color: theme.palette.primary.light,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));
