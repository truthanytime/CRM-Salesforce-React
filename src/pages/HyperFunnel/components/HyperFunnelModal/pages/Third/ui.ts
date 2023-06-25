import { styled, Box } from '@mui/material';

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
