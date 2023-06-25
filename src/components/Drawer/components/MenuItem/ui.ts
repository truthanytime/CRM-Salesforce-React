import { styled, Box, Button } from '@mui/material';

export const BlueDot = styled(Box)(({ theme }) => ({
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: theme.palette.primary.main,
}));

export const NotificationButton = styled(Button)(({ theme }) => ({
  ...theme.typography.labelMedium12,
  width: 24,
  height: 24,
  minWidth: 24,
  padding: 0,
  borderRadius: 4,
}));

NotificationButton.defaultProps = { variant: 'contained', color: 'primary' };
