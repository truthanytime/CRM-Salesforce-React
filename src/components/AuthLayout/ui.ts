import { styled, Box, Divider as MuiDivider, alpha, Grid } from '@mui/material';

import { TextButton } from 'components/ui';

export const Container = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.common.white} 50%, ${theme.palette.primary.main} 50%)`,
  minHeight: '100vh',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    background: theme.palette.primary.main,
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const ContentHeader = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  color: theme.palette.neutral.n400,
  position: 'relative',
  height: 80,
  [theme.breakpoints.down('md')]: {
    color: theme.palette.neutral.white,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const ContentFooter = styled(Box)(({ theme }) => ({
  width: '100%',
  color: theme.palette.neutral.n400,
  padding: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    color: theme.palette.neutral.main,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const HeaderLeftContent = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
}));

export const BackButton = styled(TextButton)(({ theme }) => ({
  ...theme.typography.p12,
  position: 'absolute',
  top: -12,
  left: -8,
}));

BackButton.defaultProps = { variant: 'text' };

export const CenteredContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  backgroundColor: theme.palette.primary.subtone1,
  width: 'calc(100% - 64px)',
  position: 'absolute',
  bottom: 8,
  height: 1,
}));

export const RollItem = styled(Box)(({ theme }) => ({
  height: 48,
  width: 248,
  backgroundColor: alpha(theme.palette.primary.subtone320 as string, 0.2),
  color: theme.palette.neutral.white,
  marginBottom: theme.spacing(2),
  borderRadius: 4,
  opacity: 0.2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px 18px',
  paddingTop: 12,
  '& span': {
    flex: 1,
    marginLeft: 18,
  },
}));

export const GridContainer = styled(Grid)(({ theme }) => ({
  background: 'url(/assets/icons/roadBuildings.svg)',
  backgroundSize: '50vw',
  backgroundPosition: 'bottom right',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.down('md')]: {
    backgroundSize: '100vw',
  },
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
    top: -1,
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
    marginBottom: -4,
  },
}));
