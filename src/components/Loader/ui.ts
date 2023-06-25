import { styled, Box, alpha } from '@mui/material';

export const LoaderContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
