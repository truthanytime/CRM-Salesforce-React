import { FC } from 'react';
import { InputLabel, TextField, OutlinedTextFieldProps, SxProps, Theme, Box } from '@mui/material';

interface CustomInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  labelSx?: SxProps<Theme>;
}

const CustomInput: FC<CustomInputProps> = ({ id, name, label, labelSx = {}, ...rest }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1, ...labelSx }}>
          {label}
        </InputLabel>
      )}

      <TextField id={id} name={name} type="text" {...rest} sx={{ backgroundColor: 'white', width: '100%' }} />
    </Box>
  );
};

CustomInput.defaultProps = { variant: 'outlined' };

export default CustomInput;
