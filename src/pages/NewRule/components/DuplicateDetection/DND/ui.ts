import { styled, Box } from '@mui/material';
import { Paper as MuiPaper } from '@mui/material';

export const ThirdMain = styled(Box)(({ theme }) => ({
  borderBlock: `1px solid ${theme.palette.darkBg.main}`,
  display: 'flex',
  height: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const CardPanel = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  padding: '24px 32px',
  height: '494px',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

export const CardAddBox = styled(Box)(() => ({
  width: '100%',
  minHeight: '50px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const CardContainer = styled(Box)(() => ({
  borderRadius: 4,
  padding: 4,
  margin: '4px 0',
  '& .card-header': { display: 'flex', alignItems: 'center' },
  '& .card-content': {
    margin: '12px 12px 12px 40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'self-start',
  },
}));

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
