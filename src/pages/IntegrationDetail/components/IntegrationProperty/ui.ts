import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(Box)(() => ({
  position: 'relative',
  width: '400px',
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

export const PropertyHeadContainer = styled(Box)(() => ({
  marginBottom: 24,
}));

export const PropertyContainer = styled(Box)(() => ({
  padding: '0 24px',
  overflowY: 'auto',
  height: 'calc(100vh - 17rem)',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));
