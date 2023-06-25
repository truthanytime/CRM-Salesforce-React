import { Box, Switch, SwitchProps, styled, Button as MuiButton } from '@mui/material';

export const TextButton = styled(MuiButton)(({ theme }) => ({
  ':hover': {
    backgroundColor: 'transparent !important',
    color: theme.palette.primary.main,
    'text-decoration': 'underline',
  },
}));

export const FormSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 16,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: theme.palette.neutral.white,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: theme.palette.neutral.white,
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.neutral.white,
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 12,
    height: 12,
    color: theme.palette.neutral.white,
  },
  '& .MuiSwitch-track': {
    borderRadius: 23 / 2,
    backgroundColor: theme.palette.neutral.n200,
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 16,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
  },
}));
