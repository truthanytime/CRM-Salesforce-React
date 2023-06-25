import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FilterItem from './FilterItem';

interface FilterIndex {
  name: string;
  type: string;
  compare: string;
  operator: string;
  xsd_type: string;
}

interface FilterPanelProps {
  filters: FilterIndex[];
  fields: FilterIndex[];
  removeFilter: (name: string, type: string) => void;
  addFilter: (filter: FilterIndex) => void;
  setFilter: (name: string, operator: string, compare: string) => void;
}

const FilterPanel = (props: FilterPanelProps) => {
  const { filters, fields, addFilter, removeFilter, setFilter } = props;
  const removeFilterItem = (name: string, type: string) => {
    removeFilter(name, type);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <>
        <Autocomplete
          id="add-filter"
          options={fields}
          onInputChange={(event, newInputValue) => {
            fields.forEach((field) => {
              if (field.name === newInputValue) {
                addFilter({
                  name: field.name,
                  type: field.type,
                  operator: '',
                  compare: '',
                  xsd_type: field.xsd_type,
                });
              }
            });
          }}
          getOptionLabel={(option: any) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              placeholder="Add filter..."
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          sx={{
            '& .MuiAutocomplete-endAdornment': {
              marginRight: 0,
              marginTop: 0,
            },
          }}
        />
        {filters.map((filter: FilterIndex, index: number) => (
          <FilterItem
            primary={filter.name}
            secondary={filter.operator + ' ' + filter.compare}
            key={index}
            type={filter.type}
            removeFilterItem={removeFilterItem}
            setFilterItem={setFilter}
            values={[]}
          />
        ))}
      </>
    </Box>
  );
};
export default FilterPanel;
