import { styled, Box } from '@mui/material';

export const EmptyContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  backgroundColor: '#EDF0F5',
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(3),
}));

export const ActivityContainer = styled(Box)(() => ({
  padding: 5,
  overflow: 'hidden',
  height: 'calc(100vh - 17vh)',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  ':hover': {
    overflowY: 'auto',
    paddingRight: 0,
  },
}));
