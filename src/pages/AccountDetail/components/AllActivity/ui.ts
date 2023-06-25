import { styled, Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#EDF0F5',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));
