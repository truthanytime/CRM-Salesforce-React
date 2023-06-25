import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PrimaryButton, SecondaryLoadingButton } from 'components/ui';
import React from 'react';
import { FilterItemProps } from './FilterItem';
import SearchIcon from '@mui/icons-material/Search';

const DropDownFilterWidget = (props: FilterItemProps) => {
  const [option, setOption] = React.useState('');
  const [value, setValue] = React.useState('');

  const options = ['is', 'is not'];

  const { primary, type, values, removeFilterItem, setFilterItem } = props;

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
      <Autocomplete
        id="select-value"
        options={values}
        renderInput={(params) => <TextField {...params} />}
        sx={{
          '& .MuiAutocomplete-endAdornment': {
            marginRight: 0,
            marginTop: 0,
            padding: 0,
          },
          '& .MuiOutlinedInput-root': {
            padding: 0,
          },
          mb: 1,
        }}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <SecondaryLoadingButton onClick={() => removeFilterItem(primary, type)}>Cancel</SecondaryLoadingButton>
        <PrimaryButton onClick={() => setFilterItem(primary, option, value)}>Apply</PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default DropDownFilterWidget;
