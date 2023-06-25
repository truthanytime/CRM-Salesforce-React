import { Checkbox as MuiCheckbox, IconButton, styled, PaginationItem as MuiPaginationItem } from '@mui/material';
import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';
import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';
import { ReactComponent as SortUpIcon } from 'assets/icons/triangleUp.svg';
import { ReactComponent as UnsortedIcon } from 'assets/icons/unsorted.svg';
import theme from 'core/theme';
import { forwardRef } from 'react';
// BaseCheckbox component
// eslint-disable-next-line react/display-name
export const BaseCheckbox = forwardRef((props, ref) => {
  // @ts-ignore
  return <MuiCheckbox ref={ref} {...props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />;
});
// ColumnSortedAscendingIcon component
export const ColumnSortedAscendingIcon = () => {
  return <SortUpIcon className="sortup-icon" />;
};
// ColumnSortedDescendingIcon component
export const ColumnSortedDescendingIcon = () => {
  return <SortDownIcon className="sortdown-icon" />;
};
// ColumnUnsortedIcon component
export const ColumnUnsortedIcon = () => {
  return <UnsortedIcon />;
};
// FloatingIconButton component
export const FloatingIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  right: 8,
  top: 8,
  backgroundColor: theme.palette.primary.main,
  width: 24,
  height: 24,
  borderRadius: 4,
}));

export const PaginationItem = styled(MuiPaginationItem)(({ theme }) => ({
  ...theme.typography.p12,
  border: 'none',
  color: theme.palette.neutral.main,
  minWidth: 24,
  height: 24,
  '&.Mui-selected': {
    color: theme.palette.neutral.white,
    backgroundColor: theme.palette.primary.main,
    ':hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  '&.MuiPaginationItem-ellipsis': {
    fontSize: 18,
    lineHeight: '14px',
    color: theme.palette.neutral.n400,
  },
  '&.MuiPaginationItem-previousNext': {
    marginRight: 12,
    marginLeft: 12,
  },
  ':hover': {
    backgroundColor: 'transparent',
  },
}));
