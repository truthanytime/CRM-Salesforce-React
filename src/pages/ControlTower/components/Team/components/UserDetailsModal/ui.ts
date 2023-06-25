import { styled, Modal as MuiModal, Box, alpha, IconButton } from '@mui/material';

export const Modal = styled(MuiModal)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  '& .MuiBackdrop-root': {
    backgroundColor: alpha(theme.palette.neutral.darkBlueHigh as string, 0.2),
  },
}));

export const Container = styled(Box)(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.neutral.white,
  padding: '16px 24px',
  display: 'flex',
  flexDirection: 'column',
}));

export const Header = styled(Box)(() => ({
  padding: '8px 0 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const HeaderTitleContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginLeft: 10,
  },
}));

export const Footer = styled(Box)(() => ({
  paddingTop: 24,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const Main = styled(Box)(() => ({
  flex: 1,
  padding: '8px 0px',
}));

export const NameContainer = styled(Box)(({ theme }) => ({
  padding: '0px 20px 20px',
  minHeight: 110,
  marginBottom: theme.spacing(2),
}));

export const EditButton = styled(IconButton)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: theme.palette.darkBg.main,
  marginTop: 20,
  padding: 0,
}));

export const RoleSelectContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    marginLeft: -8,
  },
}));
