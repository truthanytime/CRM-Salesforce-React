import { Box, Typography, IconButton } from '@mui/material';
import { CustomInput } from 'components/CustomInput';
import { NotificationButton, Notification } from 'components/ui';
import { ReactComponent as AvatarIcon } from 'assets/icons/avatarFilled.svg';
import { ReactComponent as DocumentIcon } from 'assets/icons/documentFilled.svg';
import { ReactComponent as ProductIcon } from 'assets/icons/productFilled.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { FC, ReactNode, useContext } from 'react';
import { SecondMain, SelectionIcon, SelectItem, SelectionLabel } from './ui';
import { ButtonGroup, ModalFooter, ModalHeader, ModalContainer, BackTo } from '../../ui';
import { LoadingButton, TextButton } from 'components/ui';
import { Pipeline, PipelineFormContext, PipelineFormSteps, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { useFormikContext } from 'formik';

interface SelectionType {
  icon: ReactNode;
  title: string;
  pageIndex: PipelineFormSteps;
  name: keyof Pipeline;
}

const Selections: SelectionType[] = [
  {
    icon: <DocumentIcon />,
    title: 'Documents',
    name: 'pipelineDocuments',
    pageIndex: PipelineFormSteps.SECOND_DOCUMENTS,
  },
  {
    icon: <AvatarIcon />,
    title: 'Team and Users',
    name: 'pipelineUsers',
    pageIndex: PipelineFormSteps.SECOND_OWNERS,
  },
  {
    icon: <ProductIcon />,
    title: 'Products',
    name: 'pipelineProducts',
    pageIndex: PipelineFormSteps.SECOND_PRODUCTS,
  },
];

const SecondPage: FC = () => {
  const { onClose, setStep } = useContext(PipelineFormContext);
  const { values, touched, errors, handleChange, handleBlur } = useFormikContext<Pipeline>();

  const { setEditPipeline } = usePipelines();

  const closeModal = () => {
    setEditPipeline(null);
    onClose();
  };
  return (
    <ModalContainer>
      <ModalHeader>
        <Typography variant="h3" sx={{ color: 'neutral.main' }}>
          {'New Pipeline'}
        </Typography>

        <IconButton onClick={closeModal}>
          <CrossIcon />
        </IconButton>
      </ModalHeader>
      <SecondMain sx={{ height: 496 }}>
        <CustomInput
          id="pipelineName"
          name="pipelineName"
          label="Pipeline name"
          placeholder="Type the pipeline name"
          fullWidth
          defaultValue={values.pipelineName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.pipelineName && !!errors.pipelineName}
        />
        <CustomInput
          id="pipelineDescription"
          name="pipelineDescription"
          label="Pipeline description"
          placeholder="Add a pipeline description"
          fullWidth
          defaultValue={values.pipelineDescription}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.pipelineDescription && !!errors.pipelineDescription}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <Typography variant="p12" sx={{ color: 'neutral.main' }}>
            DETAILS
          </Typography>
          <NotificationButton>0</NotificationButton>
        </Box>
        <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
          You can edit the Pipeline and add more details after it’s creating
        </Typography>

        {Selections.map((selection, idx) => (
          <SelectItem key={idx} onClick={() => setStep(selection.pageIndex)}>
            <SelectionLabel>
              <SelectionIcon>{selection.icon}</SelectionIcon>
              <Typography variant="p14">{selection.title}</Typography>
              <Notification>{selection.name in values ? values[selection.name].length : 0}</Notification>
            </SelectionLabel>

            <PlusIcon className="plus-n400" />
          </SelectItem>
        ))}
      </SecondMain>

      <ModalFooter>
        <BackTo onClick={() => setStep(PipelineFormSteps.FIRST)}>
          <ArrowLeft />
          <Typography variant="p12">Back to Step 1</Typography>
        </BackTo>
        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={closeModal}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={() => setStep(PipelineFormSteps.THIRD)}>
            {'Next'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
};

export default SecondPage;
