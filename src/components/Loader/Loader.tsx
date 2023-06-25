import { FC } from 'react';
import { CircularProgress } from '@mui/material';

import { LoaderContainer } from './ui';

const Loader: FC = () => {
  return (
    <LoaderContainer>
      <CircularProgress size={50} />
    </LoaderContainer>
  );
};

export default Loader;
