import { styled, Box, Button } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 30,
  left: '50%',
  transform: 'translate(-50%, 0)',
  backgroundColor: theme.palette.neutral.darkBlueHigh,
  display: 'flex',
  borderRadius: 4,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  padding: '24px 16px',
  backgroundColor: theme.palette.neutral.darkBlueHigh,
  color: theme.palette.neutral.white,
  fontWeight: 400,
  fontSize: 14,
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
  ':hover': {
    backgroundColor: theme.palette.neutral.darkBlueMedium,
  },
}));
ActionButton.defaultProps = { variant: 'text' };

export const VirticalDivider = styled(Box)(({ theme }) => ({
  width: 1,
  height: '100%',
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 50,
    position: 'absolute',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
    opacity: 0.2,
  },
}));
