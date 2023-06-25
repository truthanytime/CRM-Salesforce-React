import { Typography } from '@mui/material';
import { FC } from 'react';
import { Container } from './ui';
import { ReactComponent as CheckBoxIcon } from 'assets/icons/boxCheckedGrey.svg';

const AllActivity: FC = () => {
  return (
    <Container>
      <CheckBoxIcon />
      <Typography variant="p12" width={220} sx={{ textAlign: 'center', lineHeight: 2 }}>
        {'You don’t have any activity yet.'} {'Choose an activity on toolbar'}
      </Typography>
    </Container>
  );
};

export default AllActivity;
