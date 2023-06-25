import { styled, Box, IconButton, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  gap: 16,
}));

export const EditButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = true }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  padding: 0,
  backgroundColor: small ? 'transparent' : theme.palette.darkBg.main,
}));

export const DetailContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
}));

export const DetailValueContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = true }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: small ? theme.spacing(0.5) : theme.spacing(1.5),
}));

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
