import { JSXElementConstructor, HTMLAttributes } from 'react';
import { Autocomplete, TextField, InputLabel, SxProps, Theme, InputProps } from '@mui/material';

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as TraingleDownIcon } from 'assets/icons/triangleDown.svg';
import { Paper } from './ui';

type OptionValue = string | number;

interface Option<T extends OptionValue> {
  label: string;
  value: T;
}

interface CustomDropdownProps<T extends OptionValue> {
  value: T | null;
  options: Option<T>[];
  placeholder: string;
  id: string;
  label?: string;
  labelSx?: SxProps<Theme>;
  withPopupIcon?: boolean;
  InputProps?: Partial<InputProps>;
  onSelect: (value: T) => void;
  PaperComponent?: JSXElementConstructor<HTMLAttributes<HTMLElement>>;
  disableClearable?: boolean;
}

const CustomDropdown = <T extends OptionValue>({
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
}: CustomDropdownProps<T>): JSX.Element => {
  return (
    <div>
      {label && (
        <InputLabel htmlFor={id} sx={{ marginBottom: 1, ...labelSx }}>
          {label}
        </InputLabel>
      )}

      <Autocomplete
        disablePortal
        id={id}
        options={options}
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
        value={options.find((options) => options.value === value)}
        onChange={(e, value) => onSelect((value?.value ?? '') as T)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        popupIcon={withPopupIcon ? <TraingleDownIcon /> : null}
        clearIcon={<CrossIcon />}
        data-testid={id}
      />
    </div>
  );
};

export default CustomDropdown;
