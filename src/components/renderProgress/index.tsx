import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import theme from 'core/theme';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  width: 150,
  maxWidth: '100%',
  height: 26,
  borderRadius: 2,
}));
const Value = styled('div')({
  position: 'absolute',
  lineHeight: '24px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
const Bar = styled('div')({
  height: '100%',
  '&.low': {
    backgroundColor: theme.palette.red.main,
  },
  '&.medium': {
    backgroundColor: theme.palette.orange.main,
  },
  '&.high': {
    backgroundColor: theme.palette.green.main,
  },
});

const renderProgress = (value: number) => {
  let text = '';
  if (value > 70) {
    text = 'Good';
  } else if (value > 50) {
    text = 'Average';
  } else {
    text = 'Poor';
  }
  return (
    <Root>
      <Value>
        {text} {value}%
      </Value>
      <Bar
        className={clsx(value <= 50 && 'low', value > 50 && value <= 70 && 'medium', value > 70 && 'high')}
        style={{ maxWidth: `${value}%` }}
      ></Bar>
    </Root>
  );
};

export default renderProgress;
