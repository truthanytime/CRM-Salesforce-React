import { Modal } from 'components/ui';
import { DEFAULT_DATA_TYPES, Resource, useJourneyBuilder } from '../../../JourneyBuilderProvider';
import {
  ButtonGroup,
  ModalFooter,
  ModalContainer,
  ModalHeader,
} from 'pages/HyperFunnel/components/HyperFunnelModal/ui';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Controller, UseFormReturn } from 'react-hook-form';
import { styled } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { CustomOptions } from 'components/CustomOptions';
import { InputLabel } from '@mui/material';

type ResourceConfig = {
  resource: Resource;
  showing: boolean;
  onClose: () => void;
};

export default function ResourceConfig(props: ResourceConfig) {
  const { resource, showing, onClose } = props;
  const { resourceTypes, pipeline, createResource, updateResource } = useJourneyBuilder();

  const { control, handleSubmit, watch } = useForm();

  if (!resource) {
    return null;
  }

  const title = resource.id ? 'Resource Configuration' : 'New Resource';
  const submitButtonText = resource.id ? 'Update Resource' : 'Add Resource';

  const submit = (data: any) => {
    if (resource.id === null) {
      createResource({ ...data, pipelineId: pipeline.pipelineId });
    } else {
      updateResource(resource.id, { ...data, pipelineId: pipeline.pipelineId });
    }
    onClose();
  };

  return (
    <Modal open={showing} onClose={onClose}>
      <form onSubmit={handleSubmit(submit)}>
        <ModalContainer>
          <ModalHeader>
            <Typography>{title}</Typography>
          </ModalHeader>
          <StyledBox>
            <InputLabel>Resource Type</InputLabel>
            <Controller
              name="type"
              defaultValue={resource.type}
              control={control}
              render={({ field }) => (
                <CustomOptions
                  value={field.value}
                  options={resourceTypes}
                  fullWidth
                  variant="outlined"
                  onSelect={field.onChange}
                />
              )}
            />
            <Controller
              name="name"
              defaultValue={resource.name}
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="resouce-config-name-input"
                  name="name"
                  label="Resource Name"
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              )}
            />
            <Controller
              name="description"
              defaultValue={resource.description}
              control={control}
              render={({ field }) => (
                <CustomInput
                  id="resouce-config-description-input"
                  name="description"
                  label="Resource Description"
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                />
              )}
            />
            <DataTypeInput {...props} control={control} watch={watch} />
          </StyledBox>
          <ModalFooter>
            <div></div>
            <ButtonGroup>
              <RemoveButton {...props} />
              <Button type="submit" variant="contained">
                {' '}
                {submitButtonText}{' '}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContainer>
      </form>
    </Modal>
  );
}

function DataTypeInput(props: ResourceConfig & { control: UseFormReturn['control']; watch: UseFormReturn['watch'] }) {
  const { control, watch, resource } = props;

  const dataTypes = Object.entries(DEFAULT_DATA_TYPES).map(([key, value]) => {
    return {
      value: key,
      // label: `${value} ${key}`
      label: `${key}`,
    };
  });

  const hideDataType = watch('type', resource.type) === 'decision_split';

  if (hideDataType) {
    return null;
  }

  return (
    <>
      <InputLabel>Data Type</InputLabel>
      <Controller
        name="dataType"
        defaultValue={resource.dataType}
        control={control}
        render={({ field }) => <CustomOptions value={field.value} options={dataTypes} fullWidth variant="outlined" />}
      />
    </>
  );
}

function RemoveButton(props: ResourceConfig) {
  const { removeResource } = useJourneyBuilder();
  const {
    resource: { id },
  } = props;

  if (id === null) {
    return null;
  }

  const remove = (rid: number) => {
    removeResource(rid);
    props.onClose();
  };

  return (
    <Button variant="contained" color="error" onClick={() => remove(id)}>
      Remove
    </Button>
  );
}

export const StyledBox = styled(Box)(({ theme }) => ({
  borderBlock: `1px solid ${theme.palette.darkBg.main}`,
  display: 'block',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '8px 32px 24px',
}));
