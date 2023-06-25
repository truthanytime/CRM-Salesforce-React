import { Box } from '@mui/material';
import { ReactComponent as Icon1 } from 'assets/icons/filterBlue.svg';
import { LinkList } from 'components/LinkList';
import { FC } from 'react';
import { PropertyTitle } from '../../../ui';

// interface Props {}

const Resources: FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <PropertyTitle>Resources</PropertyTitle>
      <LinkList
        links={[
          {
            caption: 'Setup guide',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
          {
            caption: 'Support website',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
          {
            caption: 'HubSpot Community',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
        ]}
      ></LinkList>
    </Box>
  );
};
export default Resources;
