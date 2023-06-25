import { styled, Box } from '@mui/material';

type CircleProps = {
  size: string;
};
export const Circle = styled(Box)<CircleProps>(({ theme, size }) => ({
  borderRadius: '1000px',
  width: size,
  height: size,
  backgroundColor: theme.palette.neutral.lightGray,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 1,
}));
