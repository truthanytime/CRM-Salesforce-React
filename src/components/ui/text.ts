import { styled, Typography } from '@mui/material';

export const TextValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = true }) => {
  const typography = small ? theme.typography.p14 : theme.typography.h3;
  return {
    ...typography,
    color: theme.palette.neutral.main,
    fontWeight: small ? 400 : 600,
  };
});
