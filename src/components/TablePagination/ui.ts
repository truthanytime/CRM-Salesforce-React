import { styled, PaginationItem as MuiPaginationItem } from '@mui/material';

export const PaginationItem = styled(MuiPaginationItem)(({ theme }) => ({
  ...theme.typography.p12,
  border: 'none',
  color: theme.palette.neutral.main,
  minWidth: 24,
  height: 24,
  '&.Mui-selected': {
    color: theme.palette.neutral.white,
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  '&.MuiPaginationItem-ellipsis': {
    fontSize: 18,
    lineHeight: '14px',
    color: theme.palette.neutral.n400,
  },
  '&.MuiPaginationItem-previousNext': {
    marginRight: 12,
    marginLeft: 12,
  },
  ':hover': {
    backgroundColor: 'transparent',
  },
}));
