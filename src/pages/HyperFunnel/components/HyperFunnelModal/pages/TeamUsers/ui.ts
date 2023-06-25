import { styled, Box } from '@mui/material';

export const TeamUsersMain = styled(Box)(({ theme }) => ({
  margin: '0 32px',
  paddingBottom: '44px',
  borderBottom: `1px solid ${theme.palette.darkBg.main}`,
  height: '100%',
  position: 'relative',
}));
