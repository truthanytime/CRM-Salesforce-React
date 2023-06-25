import { FC, useState } from 'react';
import { OutlinedTextFieldProps, Box, Typography, Paper, ClickAwayListener } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as AccountIcon } from 'assets/icons/accountIcon.svg';
import { ReactComponent as ContactIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as DealIcon } from 'assets/icons/menuDeal.svg';
import { EditButton, DetailContainer, DetailValueContainer, TextValue } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';

type IconType = 'contact' | 'account' | 'deal';

interface EditableAutoCompleteProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  label: string;
  icon?: IconType;
  value: number;
  small?: boolean;
  options?: OptionValue<number>[];
  onSave?: (value: number) => Promise<void>;
}

const EditableAutoComplete: FC<EditableAutoCompleteProps> = ({
  id,
  label,
  icon,
  value,
  small = true,
  options = [],
  onSave,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  // const [inputValue, setInputValue] = useState<OptionValue<number> | null>();

  const onClose = async (inputValue: number) => {
    setEditing(false);

    if (!onSave) return;

    try {
      await onSave(inputValue);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  if (editing) {
    return (
      <ClickAwayListener onClickAway={() => setEditing(false)}>
        <Box position="relative">
          <CustomDropdown<number>
            id={id}
            label={label}
            placeholder={`Select the ${label}`}
            value={value || null}
            options={options}
            onSelect={(value) => {
              onClose(value);
            }}
            InputProps={{
              startAdornment: icon ? (
                <Box display="flex" justifyContent="center" alignItems="center" marginLeft="6px" marginRight="3px">
                  {icon === 'account' && <AccountIcon />}
                  {icon === 'contact' && <ContactIcon />}
                  {icon === 'deal' && <DealIcon />}
                </Box>
              ) : null,
              onBlur: () => onClose,
            }}
            PaperComponent={Paper}
          />
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <DetailContainer>
      <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
        {label}
      </Typography>

      <DetailValueContainer small={small}>
        {icon === 'account' && <AccountIcon />}
        {icon === 'contact' && <ContactIcon />}
        {icon === 'deal' && <DealIcon />}
        <TextValue small={small}>{options.find((option) => option.value === value)?.label}</TextValue>
        <EditButton onClick={() => setEditing(true)} small={small} data-testid={`edit-${id}`}>
          <EditIcon />
        </EditButton>
      </DetailValueContainer>
    </DetailContainer>
  );
};

export default EditableAutoComplete;
