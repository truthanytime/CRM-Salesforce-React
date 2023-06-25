import { Box, styled, Typography } from '@mui/material';

export const PropertyTitle = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  marginBottom: '8px',
}));
PropertyTitle.defaultProps = { variant: 'h3' };

export const FieldContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

export const FieldTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral.n400,
  marginBottom: '6px',
}));
FieldTitle.defaultProps = { variant: 'labelRegular12' };

export const FieldValue = styled(Typography)(() => ({
  fontWeight: 400,
  lineHeight: '24px',
  fontSize: '14',
}));
FieldValue.defaultProps = { variant: 'body1' };
