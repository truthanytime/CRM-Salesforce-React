import { FC, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { OutlinedTextFieldProps, ClickAwayListener, Box, Typography } from '@mui/material';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as EmailIcon } from 'assets/icons/email.svg';
import { ReactComponent as PhoneIcon } from 'assets/icons/phone.svg';
import { CustomInput } from 'components/CustomInput';
import { EditButton, DetailContainer, DetailValueContainer, TextValue } from './ui';
import { CustomTextArea } from 'components/CustomTextarea';

interface EditableInputProps extends Partial<OutlinedTextFieldProps> {
  id: string;
  name: string;
  label: string;
  value: string;
  small?: boolean;
  isText?: boolean;
  onSave?: (value: string) => Promise<void>;
}

const EditableInput: FC<EditableInputProps> = ({
  id,
  name,
  label,
  type,
  value,
  small = true,
  isText = false,
  onSave,
  ...rest
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!inputValue) setError(false);
    setInputValue(event.target.value);
  };

  const onClose = async () => {
    if (!inputValue) {
      setError(true);
      return;
    }

    setEditing(false);

    if (!onSave) return;

    try {
      await onSave(inputValue);
      setSuccess(true);
    } catch (err) {
      // TODO: How should we handle loading and error states if needed
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onClose();
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'email':
        return <EmailIcon />;
      case 'tel':
        return <PhoneIcon />;
      default:
        return null;
    }
  };

  if (editing) {
    return (
      <ClickAwayListener onClickAway={onClose}>
        <Box position="relative">
          {!isText ? (
            <CustomInput
              id={id}
              name={name}
              label={label}
              type={type}
              {...rest}
              value={inputValue}
              onChange={onChange}
              onBlur={onClose}
              error={error}
              onKeyDown={onKeyDown}
            />
          ) : (
            <CustomTextArea
              id="accountDescription"
              name="accountDescription"
              label={<Typography variant="labelRegular12">{label}</Typography>}
              placeholder={`Add ${label}`}
              minRows={4}
              maxRows={8}
              value={inputValue}
              onChange={onChange}
              onBlur={onClose}
            />
          )}
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
        {renderIcon()}

        <TextValue small={small}>{success ? inputValue : value}</TextValue>
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

export default EditableInput;
