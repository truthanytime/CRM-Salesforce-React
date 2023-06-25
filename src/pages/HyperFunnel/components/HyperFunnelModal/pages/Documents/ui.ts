import { styled, Box } from '@mui/material';
import { Notification } from 'components/ui';

export const DocumentMain = styled(Box)(({ theme }) => ({
  margin: '0 32px',
  paddingBottom: '44px',
  borderBottom: `1px solid ${theme.palette.darkBg.main}`,
  height: '100%',
  position: 'relative',
}));

export const DropDownArea = styled(Box)(({ theme }) => ({
  height: '100%',
  border: `2px dashed ${theme.palette.neutral.n200}`,
  borderRadius: 4,
  display: 'flex',
  gap: 16,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const FileNotification = styled(Notification)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  color: theme.palette.neutral.main,
}));

export const FileItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.lightBg.main,
  color: theme.palette.neutral.main,
  margin: 4,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  padding: '4px 12px',
  gap: 12,
  '&:hover': {
    backgroundColor: theme.palette.darkBg.main,
  },
}));

export const LinkItemContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginBottom: 4,
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  width: 1,
  height: 16,
  backgroundColor: theme.palette.neutral.n200,
}));
