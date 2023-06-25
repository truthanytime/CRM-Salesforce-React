import { styled, Box, Paper as MuiPaper } from '@mui/material';

export const PriceCurrencyContainer = styled(Box)(() => ({
  display: 'flex',
  '& > div': {
    flex: 1,
    ':first-of-type': {
      '& .MuiTextField-root fieldset': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    ':last-child': {
      '& .MuiTextField-root fieldset': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftWidth: 0,
      },
    },
  },
}));

export const Paper = styled(MuiPaper)(({ theme }) => ({
  boxShadow: '0px 4px 24px rgba(23, 46, 82, 0.08)',
  borderRadius: '4px',
  width: 'fit-content',
  maxWidth: '100%',
  minWidth: 218,
  '& .MuiAutocomplete-listbox': {
    '& li': {
      ...theme.typography.p14,
      height: 40,
      ':hover': {
        backgroundColor: theme.palette.lightBg.main,
      },
      '&[aria-selected="true"]': {
        backgroundColor: theme.palette.neutral.white,
        color: theme.palette.primary.main,
      },
      '&[aria-selected="true"].Mui-focused': {
        backgroundColor: theme.palette.neutral.white,
      },
    },
  },
  '& .MuiAutocomplete-noOptions': {
    ...theme.typography.p14,
    height: 48,
  },
}));
