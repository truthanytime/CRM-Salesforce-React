import { styled, Box } from '@mui/material';

export const ModalTemplateContainer = styled(Box)(({ theme }) => ({
  maxHeight: '90%',
  overflowY: 'auto',
  maxWidth: 980,
  width: '100%',
  backgroundColor: theme.palette.neutral.white,
  borderRadius: 4,
  margin: 4,
}));

export const ModalTemplateHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 48,
  borderRadius: '4px 4px 0px 0px',
  backgroundColor: theme.palette.neutral.darkBlueMedium,
}));

export const ModalIconTitle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '0 16px',
}));

export const ModalHeadButtonBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  padding: '0 8px',
  '& svg g rect': {
    fill: theme.palette.neutral.white,
  },
  '& svg path': {
    stroke: theme.palette.neutral.white,
  },
}));
