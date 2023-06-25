import { FC } from 'react';
import { styled, Typography as MuiTypography, FormControlLabel, CheckboxProps } from '@mui/material';

import { ReactComponent as CircleCheckedIcon } from 'assets/icons/circleChecked.svg';
import { ReactComponent as CircleUncheckedIcon } from 'assets/icons/circleUnchecked.svg';
import { Checkbox } from './ui';

const Typography = styled(MuiTypography)(({ theme }) => ({
  color: theme.palette.neutral.n400,
}));

interface ValidationRuleProps extends CheckboxProps {
  label: string;
}

const ValidationRule: FC<ValidationRuleProps> = ({ label, ...props }) => {
  return (
    <FormControlLabel
      sx={{ display: 'flex', alignItems: 'center', marginLeft: '2px' }}
      control={<Checkbox {...props} icon={<CircleUncheckedIcon />} checkedIcon={<CircleCheckedIcon />} />}
      label={
        <Typography variant="p14" sx={{ color: 'neutral.n400' }}>
          {label}
        </Typography>
      }
    />
  );
};

export default ValidationRule;
