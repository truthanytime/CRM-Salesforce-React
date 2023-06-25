import { styled, Box } from '@mui/material';

export const CardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  borderRadius: 4,
  padding: 24,
  gap: 24,
  width: 341,
  height: 168,
  cursor: 'pointer',
  margin: '4px 4px',
  '& .card-header': { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  '& .card-content': { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
}));
