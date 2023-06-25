import { styled, Box, Link as MuiLink } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginLeft: theme.spacing(1),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    top: '50%',
    marginTop: -8,
    width: 1,
    backgroundColor: theme.palette.primary.subtone320,
    left: 0,
  },
  display: 'flex',
  alignItems: 'center',
  paddingBottom: 2,
}));

export const Link = styled(MuiLink, {
  shouldForwardProp: (props) => props !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.neutral.white : theme.palette.neutral.n400,
  ...theme.typography.labelRegular12,
  cursor: 'pointer',
  textDecoration: 'none',
  ':hover, :active': {
    color: theme.palette.neutral.white,
  },
}));

export const Separator = styled(Box)(({ theme }) => ({
  height: 16,
  width: 16,
  '& svg path': {
    stroke: theme.palette.primary.subtone320,
  },
}));
