import { styled, Box } from '@mui/material';

export const DeleteIconContainer = styled(Box)(({ theme }) => ({
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: theme.palette.lightBg.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    height: 56,
    width: 56,
  },
}));
