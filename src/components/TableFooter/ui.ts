import { styled, Box } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: 40,
  paddingRight: 16,
  marginTop: 4,
}));

export const SelectedRowsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  '& > div': {
    ...theme.typography.p12,
    color: theme.palette.neutral.main,
  },
}));
