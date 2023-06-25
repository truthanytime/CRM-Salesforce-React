import { styled, Box, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  padding: 72,
  height: '100%',
}));

export const DetailContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
}));

export const DetailValueContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '& > div': {
    height: 16,
    width: 16,
    marginRight: 8,
    paddingTop: 1,
  },
}));

export const TextValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = true }) => {
  const typography = small ? theme.typography.p14 : theme.typography.h3;
  return {
    ...typography,
    color: theme.palette.neutral.main,
    fontWeight: small ? 400 : 600,
    marginTop: small ? theme.spacing(0.5) : theme.spacing(1.5),
  };
});
