import { styled, Box, Tabs as MuiTabs, Tab as MuiTab } from '@mui/material';

export const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

export const Tabs = styled(MuiTabs)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.neutral.white,
  height: theme.spacing(6),
  '& .MuiTabs-flexContainer': {
    display: 'flex',
    gap: theme.spacing(3),
  },
  '& .MuiTabs-indicator': {
    height: 8,
    borderRadius: 4,
    bottom: -4,
  },
}));

export const Tab = styled(MuiTab)(({ theme }) => ({
  ...theme.typography.p14,
  color: theme.palette.neutral.n400,
  height: theme.spacing(6),
  minHeight: theme.spacing(6),
  textTransform: 'none',
  width: 'fit-content',
  minWidth: 'fit-content',
  maxWidth: 'fit-content',
  padding: 0,
  // marginLeft: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const TabPanel = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  flex: 1,
}));
