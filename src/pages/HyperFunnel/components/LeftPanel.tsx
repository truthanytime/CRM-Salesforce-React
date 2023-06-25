import MuiBox from '@mui/material/Box';
import { Button, styled } from '@mui/material';
import { usePipelines } from '../PipelinesProvider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useToggle } from 'utils/toggle';
import { HyperFunnelModal } from 'pages/HyperFunnel/components';
import HyperFunnelPipelineCard from 'pages/HyperFunnel/components/HyperFunnelPipelineCard';

export default function LeftPanel() {
  const { pipelines } = usePipelines();
  const { flag, toggle } = useToggle();

  return (
    <>
      <HyperFunnelModal open={flag} toggleOpen={toggle} />

      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="inherit" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
            Pipelines: {pipelines.length}
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={toggle}>+ New Pipeline</Button>
        </Grid>
      </Grid>

      <Container margin={2}>
        {pipelines.map((pipeline, index) => (
          <HyperFunnelPipelineCard key={index} pipeline={pipeline} />
        ))}
      </Container>
    </>
  );
}

export const Container = styled(MuiBox)(() => ({
  backgroundColor: '#F6F8FB',
  padding: 16,
  height: '100%',
  marginBottom: 32,
}));

export const RightContainer = styled(MuiBox)(() => ({ padding: 24, width: 400 }));

export const LeftContainer = styled(MuiBox)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));
