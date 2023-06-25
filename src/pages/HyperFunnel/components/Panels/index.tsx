import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BasicFunnelViews from './BasicFunnelView';
import ExpandedFunnelView from './ExpandedFunnelView';
import FullJourneyView from './FullJourneyView';
import { Button, Grid } from '@mui/material';
import { useNavigate, generatePath } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { usePipelines } from 'pages/HyperFunnel/PipelinesProvider';

export default function Panels() {
  const [value, setValue] = React.useState('1');

  const navigate = useNavigate();
  const { selectedPipeline } = usePipelines();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const goToJourneyBuilder = () => {
    if (!selectedPipeline) {
      return;
    }
    const id = selectedPipeline.pipelineId;
    navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.journeyBuilder, { id: String(id) }));
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Grid container justifyContent={'space-between'} sx={{ backgroundColor: 'white', width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Basic Funnel View" value="1" />
              <Tab label="Expanded Funnel View" value="2" />
              <Tab label="Full Journey View" value="3" />
            </TabList>
          </Box>
          <Box sx={{ padding: 1 }}>
            <Button variant="outlined" sx={{ marginLeft: 1 }}>
              Statistics
            </Button>
            <Button variant="outlined" sx={{ marginLeft: 1 }}>
              Compare
            </Button>
            <Button
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={goToJourneyBuilder}
              disabled={!selectedPipeline}
            >
              Journey Builder
            </Button>
          </Box>
        </Grid>
        <TabPanel value="1">
          <BasicFunnelViews />
        </TabPanel>
        <TabPanel value="2">
          <ExpandedFunnelView />
        </TabPanel>
        <TabPanel value="3">
          <FullJourneyView />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
