import { FC, ReactNode, useState } from 'react';
import { Typography } from '@mui/material';

import { ReactComponent as TriangleDownIcon } from 'assets/icons/triangleDown.svg';
import { AvatarMenu, IconButton } from './ui';

interface AvatarDropDownProps {
  label: string;
  avatarIcon: ReactNode;
  children?: ReactNode;
}

const AvatarDropDown: FC<AvatarDropDownProps> = ({ label, avatarIcon, children }) => {
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
      <IconButton variant="text" onClick={handleClick} startIcon={avatarIcon} endIcon={<TriangleDownIcon />}>
        <Typography variant="p14">{label}</Typography>
      </IconButton>
      <AvatarMenu
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
        {children}
      </AvatarMenu>
    </div>
  );
};

export default AvatarDropDown;
