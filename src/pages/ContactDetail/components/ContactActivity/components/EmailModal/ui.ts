import { styled, Box, Button as MuiButton } from '@mui/material';

export const ModalMainContent = styled(Box)(() => ({
  padding: '16px 32px',
  '& form': {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
}));

export const IconButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  color: theme.palette.neutral.main,
  fontSize: 12,
  fontWeight: 400,
  ':hover': {
    backgroundColor: 'transparent',
    color: theme.palette.neutral.main,
  },
  ':active': {
    backgroundColor: 'transparent',
    color: theme.palette.neutral.main,
  },
  ':focused': {
    borderColor: 'transparent',
    color: theme.palette.neutral.main,
  },
  ':disabled': {
    backgroundColor: 'transparent',
  },
  '& .MuiButton-startIcon': {
    marginRight: 4,
  },
}));

IconButton.defaultProps = { variant: 'text' };
