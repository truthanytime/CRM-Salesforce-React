import { styled, Checkbox as MuiCheckbox } from '@mui/material';

export const Checkbox = styled(MuiCheckbox)(({ checked }) => ({
  padding: '4px 0px',
  marginLeft: checked ? -2 : 0,
  marginRight: checked ? 8 : 10,
}));
