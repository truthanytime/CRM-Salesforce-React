import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  flex: 7,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  overflowY: 'auto',
  height: 'calc(100vh - 3.5rem)',
}));
