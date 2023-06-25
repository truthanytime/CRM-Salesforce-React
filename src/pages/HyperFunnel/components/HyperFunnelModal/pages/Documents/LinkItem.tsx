import { IconButton } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ChangeEvent, FC } from 'react';
import { LinkItemContainer } from './ui';

const LinkItem: FC<{ link: string; onDelete: () => void; onChange: (val: string) => void }> = ({
  link,
  onDelete,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  return (
    <LinkItemContainer>
      <CustomInput
        id={'link-item'}
        name={'link-item'}
        value={link}
        onChange={handleChange}
        placeholder="Add a link..."
      />
      <IconButton onClick={onDelete}>
        <CrossIcon />
      </IconButton>
    </LinkItemContainer>
  );
};

export default LinkItem;
