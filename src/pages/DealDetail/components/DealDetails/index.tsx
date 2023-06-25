import { Divider, Typography } from '@mui/material';
import DropDownPanel from 'components/DropDownPanel';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { FC } from 'react';
import { Container } from './ui';
import { CustomIconButton } from 'components/ui';

const DealDetails: FC = () => {
  return (
    <Container>
      <Typography variant="h3">{'Details'}</Typography>

      <Divider />

      <DropDownPanel title={'Deals Connection'}>
        <CustomIconButton startIcon={<PlusIcon />}>Add new Deal</CustomIconButton>
      </DropDownPanel>

      <DropDownPanel title={'Contacts'}>
        <CustomIconButton startIcon={<PlusIcon />}>Add new Contact</CustomIconButton>
      </DropDownPanel>
    </Container>
  );
};

export default DealDetails;
