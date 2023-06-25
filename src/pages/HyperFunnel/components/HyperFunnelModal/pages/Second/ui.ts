import { styled, Box } from '@mui/material';

export const SecondMain = styled(Box)(({ theme }) => ({
  margin: '0 32px',
  padding: '32px 0',
  borderBlock: `1px solid ${theme.palette.darkBg.main}`,
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  gap: '8px',
}));

export const SelectionIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SelectionLabel = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
}));

export const SelectItem = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  padding: '12px 20px 12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 4,
  cursor: 'pointer',

  '& svg.plus-n400 path': {
    fill: theme.palette.neutral.n400,
  },
}));
