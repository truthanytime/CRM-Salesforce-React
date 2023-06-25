import { FC, ReactNode, useState } from 'react';
import { ListItemText, Collapse } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronUpIcon } from 'assets/icons/chevronUp.svg';
import { NavRoute } from 'router/types';
import { ListItem, ListItemIcon } from '../../ui';
import { BlueDot, NotificationButton } from './ui';

interface MenuItemProps {
  Icon?: ReactNode;
  label: string;
  nestedItems?: NavRoute[];
  notifications?: number;
  path: string;
  onClick: (path: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({ Icon, label, nestedItems, notifications, path, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();

  const handleExpandClick = () => {
    if (nestedItems && nestedItems.length > 0) {
      setExpanded(!expanded);
      return;
    }
    onClick(path);
  };

  const active = nestedItems ? pathname.includes(path) : path === pathname;

  return (
    <>
      <ListItem onClick={handleExpandClick} active={active}>
        {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
        <ListItemText primary={label} primaryTypographyProps={{ variant: 'labelMedium14' }} />
        {nestedItems && nestedItems.length > 0 && (
          <ListItemIcon marginRight={0} small>
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ListItemIcon>
        )}
        {notifications && notifications > 0 && (
          <ListItemIcon marginRight={0}>
            <NotificationButton>{notifications}</NotificationButton>
          </ListItemIcon>
        )}
      </ListItem>

      {nestedItems && nestedItems.length > 0 && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {nestedItems.map((item) => (
            <ListItem key={item.name} nested onClick={() => onClick(item.path)} active={pathname === item.path}>
              <ListItemIcon>
                <BlueDot />
              </ListItemIcon>
              <ListItemText primary={item.name} primaryTypographyProps={{ variant: 'labelMedium14' }} />
            </ListItem>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;
