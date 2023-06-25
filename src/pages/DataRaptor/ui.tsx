import { Box, Checkbox as MuiCheckbox, styled } from '@mui/material';
import { forwardRef } from 'react';

import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';
import { ReactComponent as SortDownIcon } from 'assets/icons/triangleDown.svg';
import { ReactComponent as SortUpIcon } from 'assets/icons/triangleUp.svg';
import { ReactComponent as UnsortedIcon } from 'assets/icons/unsorted.svg';

export const Container = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const RaptorsSection = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 32px',
}));

export const RaptorsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.darkBg.main,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}));

export const ConfidenceScoreContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',

  flexDirection: 'column',
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  padding: '24px 32px',
  backgroundColor: theme.palette.neutral.white,
}));

export const VerticalDivider = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: 1,
  height: 16,
  position: 'relative',
  '&::before': {
    content: '" "',
    height: 16,
    position: 'absolute',
    top: '-50%',
    width: 1,
    backgroundColor: theme.palette.neutral.n200,
    marginBottom: -4,
  },
}));

const Checkbox = styled(MuiCheckbox)(() => ({
  padding: '0 10px 0 0',
}));

// eslint-disable-next-line react/display-name
export const BaseCheckbox = forwardRef((props, ref) => {
  // @ts-ignore
  return <Checkbox ref={ref} {...props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />;
});

export const ColumnSortedAscendingIcon = () => {
  return <SortUpIcon className="sortup-icon" />;
};

export const ColumnSortedDescendingIcon = () => {
  return <SortDownIcon className="sortdown-icon" />;
};

export const ColumnUnsortedIcon = () => {
  return <UnsortedIcon />;
};

export const DataRaptorSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  backgroundColor: theme.palette.darkBg.main,
  padding: '24px 32px',
}));

export const DataRaptorListSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 2,
}));

export const DataRaptorScoreSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.neutral.white,
  flex: 1,
  flexDirection: 'column',
  display: 'flex',
  marginLeft: 32,
  borderRadius: 4,
}));

export const DataRaptorEmptyDashboardSection = styled(Box)(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
