import { styled, Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  padding: '24px 32px',
  backgroundColor: theme.palette.neutral.white,
}));

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
    top: '-50%',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
    marginBottom: -4,
  },
}));
