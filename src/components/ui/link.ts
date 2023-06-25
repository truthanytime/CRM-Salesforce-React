import { styled, Button } from '@mui/material';

export const TextLinkButton = styled(Button)(({ theme }) => ({
  ...theme.typography.labelRegular12,
  padding: 0,
  height: 'fit-content',
  ':hover, :active': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

TextLinkButton.defaultProps = { variant: 'text' };
