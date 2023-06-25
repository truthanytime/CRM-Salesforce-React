import { MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { PrimaryButton, SecondaryLoadingButton } from 'components/ui';
import React from 'react';
import { FilterItemProps } from './FilterItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterJalali from '@date-io/date-fns-jalali';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const DateFilterWidget = (props: FilterItemProps) => {
  const [option, setOption] = React.useState('');
  const [value, setValue] = React.useState<Dayjs>(dayjs());
  const options = ['contains', 'equals', 'starts with', 'ends with', 'is empty', 'is not empty'];

  const { primary, type, removeFilterItem, setFilterItem } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };
  const handleTextValueChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Stack>
      <Typography variant="labelMedium12" sx={{ mt: 1, mb: 0.5 }}>
        Operator
      </Typography>
      <Select
        value={option}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{ height: 40, mb: 1 }}
      >
        {options.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ my: 1 }}>
        <DatePicker
          views={['day', 'month', 'year']}
          value={value}
          onChange={(newValue) => {
            if (newValue !== null) setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <SecondaryLoadingButton onClick={() => removeFilterItem(primary, type)}>Cancel</SecondaryLoadingButton>
        <PrimaryButton onClick={() => setFilterItem(primary, option, value.format('MM/DD/YYYY'))}>Apply</PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default DateFilterWidget;
