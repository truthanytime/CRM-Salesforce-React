import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  padding: 24,
  flex: 11,
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #EDF0F5',
  borderRight: '1px solid #EDF0F5',
}));

export const ActivityHead = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  justifyContent: 'space-between',
}));
