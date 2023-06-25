import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

export default function Select(props: {
  children: JSX.Element[];
  helperLabel?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id="demo-simple-select-helper-label">Resource Type</InputLabel>
        <MuiSelect
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          defaultValue={props.defaultValue}
          label="Age"
          onChange={handleChange}
        >
          {props.children}
        </MuiSelect>
        <FormHelperText>{props.helperLabel}</FormHelperText>
      </FormControl>
    </div>
  );
}
