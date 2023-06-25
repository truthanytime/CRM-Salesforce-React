import { styled, Box, Paper as MuiPaper } from '@mui/material';

export const ModalContainer = styled(Box)(({ theme }) => ({
  maxHeight: '90%',
  overflowY: 'auto',
  width: 640,
  maxWidth: 980,
  backgroundColor: theme.palette.neutral.white,
  borderRadius: 4,
  padding: '16px 0',
}));

export const BackTo = styled(Box)(() => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}));

export const ModalHeader = styled(Box)(() => ({
  padding: '8px 32px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ModalFooter = styled(Box)(() => ({
  padding: '16px 32px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const ButtonGroup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
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
