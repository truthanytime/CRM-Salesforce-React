import { FC, useState } from 'react';
import { Typography } from '@mui/material';

import { ReactComponent as TriangleDownIcon } from 'assets/icons/triangleDown.svg';
import { TextButton, Menu, MenuItem } from './ui';

interface MenuNavItem {
  label: string;
  active: boolean;
  onClick: () => void;
}

interface DropdownProps {
  label: string;
  active?: boolean;
  textMarginRight?: number;
  items: MenuNavItem[];
}

const Dropdown: FC<DropdownProps> = ({ label, active, textMarginRight, items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <TextButton
        variant="text"
        onClick={handleClick}
        endIcon={<TriangleDownIcon />}
        active={active}
        textMarginRight={textMarginRight}
      >
        <Typography variant="labelRegular12">{label}</Typography>
      </TextButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: -12,
          horizontal: 15,
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            active={item.active}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;
