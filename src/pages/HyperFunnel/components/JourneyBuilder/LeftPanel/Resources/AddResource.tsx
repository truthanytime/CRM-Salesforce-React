import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useToggle } from 'utils/toggle';
import { Resource } from '../../JourneyBuilderProvider';
import ResourceConfig from './ResourceConfig';

export default function AddResource() {
  const { toggle, flag: showingConfig } = useToggle();
  const [resource, setResource] = useState<Resource | null>(null);

  const onAdd = () => {
    toggle();
    const newResource: Resource = {
      id: null,
      name: '',
      description: '',
      dataType: 'Text',
      type: 'variable',
    };
    setResource(newResource);
  };

  return (
    <>
      {resource && <ResourceConfig resource={resource} showing={showingConfig} onClose={toggle} />}
      <Button fullWidth variant="contained" onClick={onAdd} color="primary" sx={{ mb: 2 }}>
        {' '}
        Add Resource
      </Button>
    </>
  );
}
