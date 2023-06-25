import { styled, Box, Button as MuiButton, alpha, darken } from '@mui/material';
import { LoadingButton as MuiLoadingButton } from '@mui/lab';

export const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const LoadingButton = styled(MuiLoadingButton)(({ theme }) => {
  return {
    padding: '8px 16px',
    ':hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    ':active': {
      backgroundColor: theme.palette.primary.main,
    },
    ':focused': {
      borderColor: theme.palette.primary.dark,
    },
    '& .MuiButton-startIcon': {
      marginRight: 8,
      '& svg, & svg path': {
        fill: theme.palette.neutral.white,
      },
    },
  };
});

LoadingButton.defaultProps = { variant: 'contained' };

export const RedLoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  backgroundColor: theme.palette.red.main,
  padding: '8px 16px',
  ':hover': {
    backgroundColor: darken(theme.palette.red.main, 0.1),
  },
  ':active': {
    backgroundColor: theme.palette.red.main,
  },
  ':focused': {
    borderColor: darken(theme.palette.red.main, 0.1),
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
    '& svg, & svg path': {
      fill: theme.palette.neutral.white,
    },
  },
}));

RedLoadingButton.defaultProps = { variant: 'contained' };

export const SecondaryLoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  padding: '8px 16px',
  backgroundColor: theme.palette.neutral.white,
  ':hover': {
    backgroundColor: theme.palette.primary.subtone3,
    color: theme.palette.primary.main,
  },
  ':active': {
    backgroundColor: theme.palette.primary.subtone2,
  },
  ':focused': {
    borderWidth: 2,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
    '& svg:not(.custom-color), & svg:not(.custom-color) path': {
      fill: theme.palette.primary.main,
    },
    '& svg.custom-color': {
      marginRight: 8,
    },
  },
}));

SecondaryLoadingButton.defaultProps = { variant: 'outlined' };

export const SecondaryRedLoadingButton = styled(MuiLoadingButton)(({ theme }) => ({
  color: theme.palette.red.main,
  borderColor: theme.palette.red.main,
  ':hover': {
    backgroundColor: alpha(theme.palette.red.light, 0.35),
    color: theme.palette.red.main,
    borderColor: theme.palette.red.main,
  },
  ':active': {
    backgroundColor: theme.palette.red.light,
  },
}));

SecondaryRedLoadingButton.defaultProps = {
  variant: 'outlined',
};

export const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  ':hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  ':active': {
    backgroundColor: theme.palette.primary.main,
  },
  ':focused': {
    borderColor: theme.palette.primary.dark,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
    '& svg, & svg path': {
      fill: theme.palette.neutral.white,
    },
  },
}));

PrimaryButton.defaultProps = { variant: 'contained' };

export const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  backgroundColor: theme.palette.neutral.white,
  ':hover': {
    backgroundColor: theme.palette.primary.subtone3,
    color: theme.palette.primary.main,
  },
  ':active': {
    backgroundColor: theme.palette.primary.subtone2,
  },
  ':focused': {
    borderWidth: 2,
  },
  '& .MuiButton-startIcon': {
    marginRight: 8,
    '& svg, & svg path': {
      fill: theme.palette.primary.main,
    },
  },
}));

SecondaryButton.defaultProps = { variant: 'outlined' };

export const TextButton = styled(MuiButton)(({ theme }) => ({
  padding: '8px 16px',
  color: theme.palette.neutral.main,
  ':hover': {
    backgroundColor: theme.palette.lightBg.main,
    color: theme.palette.neutral.main,
  },
  ':active': {
    backgroundColor: theme.palette.darkBg.main,
    color: theme.palette.neutral.main,
  },
  ':focused': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.neutral.main,
  },
  ':disabled': {
    backgroundColor: 'transparent',
  },
}));

TextButton.defaultProps = { variant: 'text' };

export const SecondaryRedButton = styled(SecondaryButton)(({ theme }) => ({
  color: theme.palette.red.main,
  borderColor: theme.palette.red.main,
  ':hover': {
    backgroundColor: alpha(theme.palette.red.light, 0.35),
    color: theme.palette.red.main,
    borderColor: theme.palette.red.main,
  },
  ':active': {
    backgroundColor: theme.palette.red.light,
  },
}));

export const NotificationButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  padding: 0,
  borderRadius: 4,
  fontWeight: 500,
  fontSize: 12,
}));

export const Notification = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  padding: 0,
  borderRadius: 4,
  fontWeight: 500,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 12,
}));

export const CustomIconButton = styled(TextButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 12,
  fontWeight: 400,
  height: 32,
  '& .MuiButton-startIcon': {
    marginRight: 8,
  },
}));
