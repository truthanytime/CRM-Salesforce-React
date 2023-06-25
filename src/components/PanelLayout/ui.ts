import { styled, Box } from '@mui/material';

import { NAV_BAR_HEIGHT } from 'core/constants';

export const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: NAV_BAR_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.lightBg.main,
}));
