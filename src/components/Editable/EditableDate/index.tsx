import { FC, useState, useEffect } from 'react';
import { OutlinedTextFieldProps, Box, Typography } from '@mui/material';
import format from 'date-fns/format';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { EditButton, DetailContainer, DetailValueContainer, TextValue } from './ui';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

interface EditableDateProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  label: string;
  value: Date | undefined;
  small?: boolean;
  onSave?: (value: Date) => Promise<void>;
}

const EditableDate: FC<EditableDateProps> = ({ id, label, value, small = true, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState<Date | undefined | null>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onClose = async () => {
    if (!inputValue) return;

    setEditing(false);

    if (!onSave) return;

    try {
      await onSave(inputValue);
      setSuccess(true);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  return (
    <DetailContainer>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer small={small}>
        <TextValue small={small}>
          {success
            ? inputValue && format(new Date(inputValue), 'MM/dd/yyyy')
            : value && format(new Date(value), 'MM/dd/yyyy')}
        </TextValue>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            open={editing}
            onOpen={() => setEditing(true)}
            onClose={onClose}
            renderInput={({ inputRef }) => <Box ref={inputRef}></Box>}
            value={value}
            onChange={(newValue) => {
              setInputValue(newValue);
            }}
          />
        </LocalizationProvider>
        <EditButton
          onClick={() => {
            setEditing(true);
            setSuccess(false);
          }}
          small={small}
          data-testid={`edit-${id}`}
        >
          <EditIcon />
        </EditButton>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default EditableDate;
