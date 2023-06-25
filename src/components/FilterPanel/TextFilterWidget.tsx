import { MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { PrimaryButton, SecondaryLoadingButton } from 'components/ui';
import React from 'react';
import { FilterItemProps } from './FilterItem';

const TextFilterWidget = (props: FilterItemProps) => {
  const [option, setOption] = React.useState('');
  const [textValue, setTextValue] = React.useState('');

  const options = ['contains', 'equals', 'starts with', 'ends with', 'is empty', 'is not empty'];

  const { primary, type, removeFilterItem, setFilterItem } = props;

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };
  const handleTextValueChange = (event: any) => {
    setTextValue(event.target.value);
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
      <TextField
        id="textvalue"
        label=""
        variant="outlined"
        sx={{ my: 1 }}
        value={textValue}
        onChange={handleTextValueChange}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <SecondaryLoadingButton onClick={() => removeFilterItem(primary, type)}>Cancel</SecondaryLoadingButton>
        <PrimaryButton onClick={() => setFilterItem(primary, option, textValue)}>Apply</PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default TextFilterWidget;
