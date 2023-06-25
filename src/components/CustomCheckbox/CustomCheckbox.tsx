import { CSSProperties, FC } from 'react';
import { CheckboxProps, Typography, SxProps, Theme, FormControlLabel } from '@mui/material';

import { ReactComponent as BoxChecked } from 'assets/icons/boxChecked.svg';
import { ReactComponent as BoxUnchecked } from 'assets/icons/boxUnchecked.svg';
import { Checkbox } from './ui';

interface CustomCheckboxProps extends CheckboxProps {
  label: string;
  containerSyle?: CSSProperties;
  labelSyle?: CSSProperties;
  labelSx?: SxProps<Theme>;
}

const CustomCheckbox: FC<CustomCheckboxProps> = ({ label, containerSyle, labelSx, ...props }) => {
  return (
    <FormControlLabel
      sx={{ display: 'flex', alignItems: 'center', marginLeft: '-2px' }}
      style={containerSyle}
      control={<Checkbox {...props} icon={<BoxUnchecked />} checkedIcon={<BoxChecked />} />}
      label={
        <Typography variant="p12" sx={{ color: 'neutral.n400', ...labelSx }}>
          {label}
        </Typography>
      }
    />
  );
};

export default CustomCheckbox;
