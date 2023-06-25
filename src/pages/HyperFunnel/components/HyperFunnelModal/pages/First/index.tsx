import { Box, Typography, IconButton } from '@mui/material';
import { FC, ReactNode, useContext } from 'react';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { ReactComponent as FunnelIcon } from 'assets/icons/menuFunnel.svg';
import { ReactComponent as QuestionIcon } from 'assets/icons/question.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ActionSelect, FirstMain, SelectionIcon } from './ui';
import theme from 'core/theme';
import { ButtonGroup, ModalFooter, ModalContainer, ModalHeader } from '../../ui';
import { LoadingButton, TextButton } from 'components/ui';
import { PipelineFormContext, PipelineFormSteps, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';

export enum ActionType {
  FROM_SCRATCH,
  FROM_TEMPLATE,
  SYSTEM_GENERATE,
}

type SelectionType = {
  icon: {
    shape: ReactNode;
    color: string;
    backgroundColor?: string;
  };
  title: string;
  type: ActionType;
  description: string;
};

const Selections: SelectionType[] = [
  {
    icon: { shape: <PlusIcon />, color: theme.palette.primary.main, backgroundColor: theme.palette.primary.subtone3 },
    title: 'Create from Scratch',
    type: ActionType.FROM_SCRATCH,
    description: 'Use the Xperience Builder, the interactive drag & drop tool to craft your own business processes',
  },
  {
    icon: { shape: <FunnelIcon />, color: theme.palette.green.main, backgroundColor: theme.palette.green.light },
    title: 'Choose from the template',
    type: ActionType.FROM_TEMPLATE,
    description: 'Pick one of our pre-built Pipeline templates',
  },
  {
    icon: { shape: <QuestionIcon />, color: theme.palette.orange.main, backgroundColor: theme.palette.orange.light },
    title: 'Respond to questionnaire and system generates pipeline',
    type: ActionType.SYSTEM_GENERATE,
    description: 'Respond to the questionnaire and the system will generate the pipeline for you',
  },
];

const FirstPage: FC = () => {
  const { onClose, setStep } = useContext(PipelineFormContext);
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
      <FirstMain sx={{ height: 496 }}>
        {Selections.map((selection, idx) => (
          <ActionSelect key={idx} onClick={console.log} selected={selection.type === ActionType.FROM_SCRATCH}>
            <SelectionIcon color={selection.icon.color} backgroundColor={selection.icon.backgroundColor}>
              {selection.icon.shape}
            </SelectionIcon>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', pt: '4px' }}>
              <Typography variant="labelMedium14">{selection.title}</Typography>
              <Typography variant="p12" sx={{ color: 'neutral.n400' }}>
                {selection.description}
              </Typography>
            </Box>
          </ActionSelect>
        ))}
      </FirstMain>

      <ModalFooter>
        <Box>
          <Typography variant="p14">{1}</Typography>
          <Typography variant="p14" sx={{ color: 'neutral.n400' }}>
            {' / 3'}
          </Typography>
        </Box>

        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={closeModal}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={() => setStep(PipelineFormSteps.SECOND)}>
            {'Next'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
};

export default FirstPage;
