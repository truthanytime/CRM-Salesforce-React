import { Box, styled } from '@mui/material';

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 16,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
  },
}));

export const DataValidationListSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 2,
}));
