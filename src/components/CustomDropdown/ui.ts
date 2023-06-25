import { styled, Paper as MuiPaper } from '@mui/material';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  boxShadow: '0px 4px 24px rgba(23, 46, 82, 0.08)',
  borderRadius: '4px',
  '& .MuiAutocomplete-listbox': {
    '& li': {
      ...theme.typography.p14,
      height: 32,
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
