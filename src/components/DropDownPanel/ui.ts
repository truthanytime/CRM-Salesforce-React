import { Box, styled } from '@mui/material';
import { TextButton } from 'components/ui';

export const Container = styled(Box)(() => ({}));

export const Head = styled(TextButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: '#F6F8FB',
  width: '100%',
  height: 32,
  display: 'flex',
  textTransform: 'uppercase',
  justifyContent: 'space-between',
  fontSize: 12,
  fontWeight: 400,
  padding: 8,
}));
