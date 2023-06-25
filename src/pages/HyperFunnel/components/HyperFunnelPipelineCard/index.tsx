import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Pipeline, usePipelines, FetchPipeline } from 'pages/HyperFunnel/PipelinesProvider';
import DeleteForever from '@mui/icons-material/DeleteForever';
import DescriptionIcon from '@mui/icons-material/Description';

import { IconButton, styled } from '@mui/material';
import { useToggle } from 'utils/toggle';
import { HyperFunnelModal } from 'pages/HyperFunnel/components';

export default function HyperFunnelPipelineCard(props: { pipeline: FetchPipeline }) {
  const { setEditPipeline, deletePipeline, setSelectedPipeline, selectedPipeline } = usePipelines();
  const { flag, toggle } = useToggle();

  const onEdit = () => {
    setEditPipeline(props.pipeline.pipelineId);
    toggle();
  };

  const onDelete = () => {
    deletePipeline(props.pipeline.pipelineId);
  };

  return (
    <StyledCard
      onClick={() => setSelectedPipeline(props.pipeline)}
      selected={props.pipeline.pipelineId === selectedPipeline?.pipelineId}
    >
      <HyperFunnelModal open={flag} toggleOpen={toggle} />
      <CardHeader
        title={props.pipeline.pipelineName}
        action={
          <>
            <IconButton onClick={onEdit}>
              <DescriptionIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteForever />
            </IconButton>
          </>
        }
      />
    </StyledCard>
  );
}

const StyledCard = styled(Card)<{ selected: boolean }>(({ theme, selected }) => ({
  width: '100%',
  borderRadius: 2,
  marginBottom: 2,
  borderColor: 'blue',
  borderWidth: 4,
  color: selected === true ? 'blue' : '#1E232C',

  ':hover': {
    cursor: 'pointer',
  },
}));
