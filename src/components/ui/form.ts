import { styled, TextField, Box } from '@mui/material';

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Input = styled(TextField)(({ theme }) => ({
  width: 400,
  marginTop: theme.spacing(1),
}));

export const AuthInput = styled(TextField)(({ theme }) => ({
  width: 400,
  marginTop: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: 350,
  },
  '@media (max-width: 420px)': {
    width: 280,
  },
}));

AuthInput.defaultProps = {
  className: 'AuthInput',
};

export const AuthFormContainer = styled(Box)(() => ({
  width: 400,
}));
