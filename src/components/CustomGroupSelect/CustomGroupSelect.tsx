import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as React from 'react';

// Props interface for the CustomGroupSelect component
interface GroupSelectProps {
  data: SubGroup[];
  tableName: string;
  setTableName: (tableName: string) => void;
}
// SubGroup interface
export interface SubGroup {
  header: string;
  items: Item[];
}
// Item interface
export interface Item {
  name: string;
  value: string;
}

const RenderLabel = (props: React.HTMLAttributes<HTMLLIElement>, option: Option) => {
  if (option.header) return <ListSubheader key={option.id}>{option.label}</ListSubheader>;
  return (
    <MenuItem value={option.label} key={option.label} {...props}>
      {option.label}
    </MenuItem>
  );
};

// CustomGroupSelect component
const CustomGroupSelect = (props: GroupSelectProps) => {
  // State to store the selected value
  const [listData, setListData] = React.useState<Option[]>([]);
  const [option, setOption] = React.useState<Option>();
  const [input, setInput] = React.useState<string>();
  const { data, tableName, setTableName } = props;

  React.useEffect(() => {
    const newListData: Option[] = [];
    let id = 0;
    for (const subgroup of data) {
      newListData.push({ id: id++, label: subgroup.header, header: true });
      for (const item of subgroup.items) {
        newListData.push({ id: id++, label: item.name, header: false });
      }
    }
    setListData(newListData);
  }, [props.data]);

  React.useEffect(() => {
    if (listData.length > 0) {
      let optionValue = listData.find((record) => record.label === tableName);
      optionValue = optionValue ? optionValue : listData[0];
      setOption(optionValue);
      setInput(optionValue.label);
    }
  }, [listData, tableName]);

  return (
    <Box
      sx={{
        '& .MuiPaper-root': {
          mt: 1,
        },
        '& .css-v4elcv-MuiAutocomplete-listbox': {
          p: 0,
        },
      }}
    >
      {option && (
        <Autocomplete
          disablePortal
          value={option}
          onChange={(event, value) => {
            if (value) setTableName(value.label);
          }}
          inputValue={input}
          onInputChange={(event, newInputValue) => {
            setInput(newInputValue);
          }}
          id="combo-box-demo"
          options={listData}
          renderInput={(params) => <TextField {...params} label="" />}
          getOptionLabel={(option: Option) => option.label}
          renderOption={(props, option: Option) => RenderLabel(props, option)}
          sx={{
            width: 200,
            '& .MuiAutocomplete-endAdornment': {
              marginRight: 0,
              marginTop: 0,
            },
          }}
        />
      )}
    </Box>
  );
};
export default CustomGroupSelect;

interface Option {
  id: number;
  label: string;
  header: boolean;
}
