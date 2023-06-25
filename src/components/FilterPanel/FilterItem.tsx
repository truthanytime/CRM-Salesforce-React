import AdapterJalali from '@date-io/date-fns-jalali';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ReactComponent as CloseButton } from 'assets/icons/cross.svg';
import { PrimaryButton, SecondaryLoadingButton } from 'components/ui';
import { Dayjs } from 'dayjs';
import React from 'react';
import DateFilterWidget from './DateFilterWidget';
import DropDownFilterWidget from './DropDownFilterWidget';
import NumberFilterWidget from './NumberFilterWidget';
import TextFilterWidget from './TextFilterWidget';
// Styled component for customizing the AccordionSummary
export const MyAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  '&.Mui-expanded': {
    margin: '0 0',
    minHeight: 'unset',
  },
}));

export interface FilterItemProps {
  primary: string;
  secondary: string;
  type: string;
  values: string[];
  removeFilterItem: (name: string, type: string) => void;
  setFilterItem: (name: string, operator: string, compare: string) => void;
}

// DataFilterAccordion component
const FilterItem = (props: FilterItemProps) => {
  const [option, setOption] = React.useState('');
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { primary, secondary, type, removeFilterItem, setFilterItem } = props;
  const values = props.values ?? [];
  const options = ['equals', 'not equal to', 'less than', 'greater than', 'less or equal', 'greater or equal'];
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };
  const handleSetFilterItem = (name: string, operator: string, compare: string) => {
    setFilterItem(name, operator, compare);
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Accordion sx={{ boxShadow: 'none', marginTop: 1 }} defaultExpanded>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: 'darkBg.main',
            borderRadius: 0.5,
            pr: 1,
          }}
        >
          <MyAccordionSummary
            sx={{
              borderRadius: 0.5,
              backgroundColor: 'darkBg.main',
              maxHeight: 32,
              minHeight: 32,
              padding: 0,
              flexDirection: 'row-reverse',
            }}
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', width: 24, height: 20 }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="labelMedium14" sx={{ color: 'primary.main' }}>
              {primary}
            </Typography>
            <Typography variant="labelMedium12" sx={{ color: 'neutral.400', mt: 0.625, ml: 1 }}>
              {secondary}
            </Typography>
          </MyAccordionSummary>
          <IconButton onClick={() => removeFilterItem(primary, type)}>
            <CloseButton />
          </IconButton>
        </Stack>
        <AccordionDetails sx={{ p: 0, pl: 3 }}>
          <Stack>
            {type === 'text' && (
              <TextFilterWidget
                primary={primary}
                type={type}
                removeFilterItem={removeFilterItem}
                setFilterItem={setFilterItem}
                values={values}
                secondary={secondary}
              />
            )}
            {type === 'number' && (
              <NumberFilterWidget
                primary={primary}
                type={type}
                removeFilterItem={removeFilterItem}
                setFilterItem={setFilterItem}
                values={values}
                secondary={secondary}
              />
            )}
            {type === 'dropdown' && (
              <DropDownFilterWidget
                primary={primary}
                type={type}
                removeFilterItem={removeFilterItem}
                setFilterItem={setFilterItem}
                values={values}
                secondary={secondary}
              />
            )}
            {type === 'date' && (
              <DateFilterWidget
                primary={primary}
                type={type}
                removeFilterItem={removeFilterItem}
                setFilterItem={setFilterItem}
                values={values}
                secondary={secondary}
              />
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default FilterItem;
