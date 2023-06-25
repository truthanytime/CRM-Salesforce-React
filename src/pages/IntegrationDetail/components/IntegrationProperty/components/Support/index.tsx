import { Box } from '@mui/material';
import { ReactComponent as Icon1 } from 'assets/icons/filterBlue.svg';
import { LinkList } from 'components/LinkList';
import { FC } from 'react';
import { PropertyTitle } from '../../../ui';

// interface Props {}

const Support: FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <PropertyTitle>CustomerCity Support</PropertyTitle>
      <LinkList
        links={[
          {
            caption: 'Company website',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
          {
            caption: 'Linkedin',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
          {
            caption: '+1 (888) 111-2233',
            href: '#',
            itemIcon: Icon1,
            withLaunchIcon: true,
          },
        ]}
      ></LinkList>
    </Box>
  );
};
export default Support;
