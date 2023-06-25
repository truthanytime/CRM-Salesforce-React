import { styled, Box } from '@mui/material';

export const StageContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 6,
}));

export const StageItem = styled(Box)(() => ({
  flex: 1,
  height: 4,
  borderRadius: 2,
}));
