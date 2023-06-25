import MuiBox from '@mui/material/Box';
import { Button, Grid, styled, Toolbar } from '@mui/material';
import FlowExample from 'pages/HyperFunnel/components/JourneyBuilder/Panel/FlowExample';
import CanvasPanel from './Canvas';
import { useNavigate, generatePath } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';

export default function Panel() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.hyperFunnel));
  };
  return (
    <>
      <Toolbar style={{ backgroundColor: 'white' }}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="outlined" onClick={goBack}>
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
      </Toolbar>
      <CanvasPanel />
    </>
  );
}
