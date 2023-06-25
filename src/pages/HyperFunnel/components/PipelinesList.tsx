import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material';
import LeftPanel from 'pages/HyperFunnel/components/LeftPanel';
import Panels from 'pages/HyperFunnel/components/Panels';
import PanelBodySidebar from 'components/PanelLayout/PanelBodySidebar';
import { usePipelines } from '../PipelinesProvider';

export default function PipelinesList() {
  const { pipelines } = usePipelines();

  if (pipelines.length === 0) {
    return null;
  }
  return (
    <PanelBodySidebar leftPanelChild={<LeftPanel />} middlePanelChild={<Panels />} leftPanelTitle="HyperFunnels" />
  );
}

export const Container = styled(MuiBox)(() => ({
  flex: 1,
  display: 'flex',
  backgroundColor: '#EDF0F5',
}));

export const RightContainer = styled(MuiBox)(() => ({ padding: 24, width: 800 }));

export const LeftContainer = styled(MuiBox)(() => ({
  position: 'relative',
  flex: 7,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));
