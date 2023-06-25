import { JSXElementConstructor, HTMLAttributes } from 'react';
import { Autocomplete, TextField, InputLabel, SxProps, Theme, InputProps, Box } from '@mui/material';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as TraingleDownIcon } from 'assets/icons/triangleDown.svg';
import { Paper } from './ui';
import { User } from 'store/user/types';
import { OptionValue } from 'core/types';
import { Product } from 'providers/ProductsProvider';

type OptionValueType = string | number | User | Product;

interface CustomMultiDropdownProps<T extends OptionValueType> {
  value: OptionValue<T>[];
  options: OptionValue<T>[];
  placeholder: string;
  id: string;
  label?: string;
  labelSx?: SxProps<Theme>;
  withPopupIcon?: boolean;
  InputProps?: Partial<InputProps>;
  onSelect: (value: OptionValue<T>[]) => void;
  PaperComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
  disableClearable?: boolean;
}

const CustomMultiDropdown = <T extends OptionValueType>({
  value,
  options,
  placeholder,
  id,
  label,
  labelSx = {},
  withPopupIcon = true,
  onSelect,
  InputProps,
  PaperComponent,
  disableClearable = true,
}: CustomMultiDropdownProps<T>): JSX.Element => {
  return (
    <Box sx={{ width: '100%' }}>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1, ...labelSx }}>
          {label}
        </InputLabel>
      )}

      <Autocomplete
        disablePortal
        id={id}
        options={options}
        multiple
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder={placeholder}
            InputProps={{ ...params.InputProps, ...InputProps }}
          />
        )}
        disableClearable={disableClearable}
        PaperComponent={PaperComponent || Paper}
        ListboxProps={{ style: { maxHeight: 300 } }}
        value={value}
        onChange={(e, value) => onSelect(value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        popupIcon={withPopupIcon ? <TraingleDownIcon /> : null}
        clearIcon={<CrossIcon />}
        data-testid={id}
      />
    </Box>
  );
};

export default CustomMultiDropdown;
