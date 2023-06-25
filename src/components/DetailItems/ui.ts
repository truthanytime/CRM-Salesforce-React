import { Box, Grid, styled } from '@mui/material';

export const DealContainer = styled(Grid)(() => ({
  padding: '16px 8px 0',
  marginBottom: 16,
}));
DealContainer.defaultProps = { spacing: 2, container: true };

export const AccountContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 8px 0',
  marginBottom: 16,
}));

export const ContactContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '16px 8px 0',
  marginBottom: 16,
}));
