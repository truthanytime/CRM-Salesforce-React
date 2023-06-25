import { styled, ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton } from '@mui/material';

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  height: 176,
}));

export const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  ...theme.typography.labelMedium12,
  color: theme.palette.neutral.main,
  flexBasis: '33%',
  height: 56,
  backgroundColor: theme.palette.lightBg.main,
  textTransform: 'none',
  borderRadius: '4px !important',
  borderColor: 'transparent',
  ':hover, &.Mui-selected:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.lightBg.main,
  },
  '&.Mui-selected': {
    borderRadius: 4,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.lightBg.main,
  },
}));
