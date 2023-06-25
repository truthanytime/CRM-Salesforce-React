import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { FC } from 'react';

import { ReactComponent as LaunchIcon } from 'assets/icons/launch.svg';

type LinkItem = {
  href: string;
  itemIcon: FC;
  caption: string;
  withLaunchIcon: boolean;
};

type Props = { links: LinkItem[] };

const LinkList: FC<Props> = ({ links }) => {
  return (
    <List style={{ paddingTop: 0 }}>
      {links.map((link, index) => {
        const ListIcon = link.itemIcon;
        return (
          <ListItem disablePadding key={index}>
            <Box display="flex" flexDirection="row" justifyContent="left" paddingTop={0}>
              <IconButton edge="start" aria-label="launch">
                <ListIcon />
              </IconButton>
              <ListItemText
                primary={link.caption}
                primaryTypographyProps={{
                  color: 'primary',
                  fontWeight: 'small',
                  fontSize: '14px',
                  lineHeight: '24px',
                }}
                style={{ marginLeft: '2px', marginRight: '8px', cursor: 'pointer' }}
              />
              <IconButton edge="start" aria-label="launch">
                <LaunchIcon />
              </IconButton>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};
/* LinkList.defaultProps = {  }; */

export default LinkList;
