import { styled, Box } from '@mui/material';

export const ActionSelect = styled(Box)<{ selected: boolean }>(({ theme, selected }) => ({
  width: '100%',
  height: 96,
  backgroundColor: theme.palette.neutral.white,
  border: selected ? `1px solid ${theme.palette.primary.main}` : '',
  borderRadius: 4,
  padding: '12px 16px',
  display: 'flex',
  gap: 12,
  cursor: 'pointer',
}));

export const FirstMain = styled(Box)(() => ({
  padding: '32px 32px 52px',
  height: '100%',
  backgroundColor: '#F6F8FB',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

export const SelectionIcon = styled(Box)<{ color: string; backgroundColor?: string }>(({ color, backgroundColor }) => ({
  backgroundColor: backgroundColor,
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    margin: 'auto',
    '& path': {
      stroke: color,
    },
    '& circle': {
      stroke: color,
    },
  },
}));
