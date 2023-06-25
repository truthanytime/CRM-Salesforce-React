import { useState, useEffect } from 'react';
import { SelectChangeEvent, SxProps, Theme } from '@mui/material';

import { Select, OptionItem } from './ui';

type OptionValue = string | number;

interface Option<T extends OptionValue> {
  label: string;
  value: T;
}

interface CustomSelectProps<T extends OptionValue> {
  id?: string;
  name?: string;
  value: T;
  options: Option<T>[];
  onSelect?: (value: T) => Promise<void>;
  small?: boolean;
  sx?: SxProps<Theme>;
  variant?: 'outlined' | 'standard';
  fullWidth?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
}

const CustomSelect = <T extends OptionValue>({
  id,
  value,
  options,
  onSelect,
  small,
  sx = {},
  variant = 'standard',
  fullWidth,
  placeholder,
  defaultValue,
  disabled = false,
}: CustomSelectProps<T>): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState<T>();

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const onChange = async (event: SelectChangeEvent<unknown>) => {
    setSelectedValue(event.target.value as T);

    if (!onSelect) return;

    try {
      await onSelect(event.target.value as T);
    } catch (error) {
      /** */
    }
  };

  const selectedOption = options.find((option) => option.value === selectedValue);

  return (
    <Select
      id={id}
      value={selectedOption?.value ?? ''}
      defaultValue={defaultValue || ''}
      onChange={onChange}
      MenuProps={{
        PaperProps: {
          style: {
            boxShadow: '0px 4px 24px rgba(23, 46, 82, 0.08)',
            borderRadius: '4px',
          },
        },
      }}
      small={small}
      sx={{
        width: fullWidth ? '100%' : 'fit-content',
        height: 40,
        ':hover svg path': {
          fill: '#1554FF',
          stroke: '#1554FF',
        },
        ...sx,
      }}
      variant={variant}
      label=""
      fullWidth={fullWidth}
      placeholder={placeholder}
      disabled={disabled}
    >
      {options.map((option) => (
        <OptionItem key={option.value} value={option.value} small={small}>
          {option.label}
        </OptionItem>
      ))}
    </Select>
  );
};

export default CustomSelect;
