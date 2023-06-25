import { styled, Box } from '@mui/material';

export const DataSourceCard = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.neutral.n200}`,
  padding: '1.5rem',
  textAlign: 'center',
  borderRadius: 10,
  ':hover': {
    cursor: 'pointer',
  },
}));

export const SelectedDataSourceCard = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  padding: '1.5rem',
  textAlign: 'center',
  borderRadius: 10,
  ':hover': {
    cursor: 'pointer',
  },
}));
