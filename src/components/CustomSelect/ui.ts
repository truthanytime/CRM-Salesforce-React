import { styled, Select as MuiSelect, MenuItem } from '@mui/material';

import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';

export const Select = styled(MuiSelect, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ small = false }) => ({
  fontSize: small ? 12 : 14,
  lineHeight: small ? '16px' : '24px',
  fontWeight: small ? 400 : 500,
  padding: '4px 8px 4px 0',
  position: 'relative',
  '& svg': {
    marginTop: 2,
    right: 12,
    position: 'absolute',
  },
  ':before, :after': {
    borderWidth: '0px !important',
  },
  '& .MuiInput-input:focus': {
    backgroundColor: 'transparent',
  },
}));

Select.defaultProps = { variant: 'standard', IconComponent: SortDownIcon };

export const OptionItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== 'small',
})<{ small?: boolean }>(({ theme, small = false }) => ({
  fontSize: small ? 12 : 14,
  lineHeight: small ? '16px' : '24px',
  fontWeight: small ? 400 : 500,
  ':hover': {
    backgroundColor: theme.palette.lightBg.main,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.neutral.white,
    color: theme.palette.primary.main,
    ':hover': {
      backgroundColor: theme.palette.neutral.white,
    },
  },
}));
