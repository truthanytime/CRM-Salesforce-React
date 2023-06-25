import { Box, IconButton, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import { ReactNode, useState } from 'react';

interface CustomMenuProps {
  sx?: SxProps<Theme>;
  icon: ReactNode;
  childItems: ReactNode[];
  onSelect: (idx: number) => void;
}

const CustomMenu = ({ sx = {}, icon, childItems, onSelect }: CustomMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    onSelect(index);
    handleClose();
  };
  return (
    <Box sx={sx}>
      <IconButton
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {icon}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 150,
          },
        }}
      >
        {childItems.map((child, idx) => (
          <MenuItem key={idx} onClick={(event) => handleMenuItemClick(event, idx)}>
            {child}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CustomMenu;
