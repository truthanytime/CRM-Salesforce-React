import { styled, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(Box)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

export const BackToRoute = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: 12,
  marginTop: 24,
  marginLeft: 24,
  gap: 12,
  color: 'black',
}));

export const DeleteButton = styled(Button)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.red.main,
  padding: '0 16px',
  '&:hover': {
    color: theme.palette.red.main,
    backgroundColor: '#00000005',
  },

  '& svg': {
    '& path:last-child,rect': {
      stroke: theme.palette.red.main,
    },
    '& path:first-of-type': {
      fill: theme.palette.red.main,
    },
  },
}));

export const ProfileHead = styled(Box)(() => ({
  display: 'flex',
  gap: 24,
  padding: '32px 24px',
  '& .main-profile': {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    '&-content': {
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
    },
  },
}));

export const PropertyContainer = styled(Box)(() => ({
  padding: 24,
  overflowY: 'auto',
  height: 'calc(100vh - 17rem)',
}));
