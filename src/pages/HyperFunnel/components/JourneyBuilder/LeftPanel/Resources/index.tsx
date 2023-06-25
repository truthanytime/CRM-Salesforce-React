import AddResource from './AddResource';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Resource, ResourceType, useJourneyBuilder } from '../../JourneyBuilderProvider';
import { ReactComponent as TextSVG } from 'assets/icons/resourceText.svg';
import { ReactComponent as DecisionSplitSVG } from 'assets/icons/resourceDecisionSplit.svg';

import { Box, Grid } from '@mui/material';
import { useToggle } from 'utils/toggle';
import ResourceConfig from './ResourceConfig';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from 'pages/HyperFunnel/ui';
export default function Resources() {
  return (
    <>
      <AddResource />
      <ResourceList />
    </>
  );
}

function ResourceList() {
  const { resourceTypes, resources } = useJourneyBuilder();

  const numOfresouces = (type: ResourceType) => {
    return resources.filter((r) => r.type === type.value).length;
  };

  return (
    <div>
      {resourceTypes.map((type, index) => {
        return (
          <StyledAccordion key={index}>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <Typography>{`${type.label}s ${numOfresouces(type)}`}</Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <Grid container>
                <ResourceItems type={type} />
              </Grid>
            </StyledAccordionDetails>
          </StyledAccordion>
        );
      })}
    </div>
  );
}

function ResourceItems(props: { type: ResourceType }) {
  const { type } = props;
  const { resources: savedResources } = useJourneyBuilder();

  const resources = savedResources.filter((r) => r.type === type.value);

  return (
    <>
      {resources.map((resource, index) => {
        return <ResourceItem resource={resource} key={index} />;
      })}
    </>
  );
}

function ResourceItem(props: { resource: Resource }) {
  const { resource } = props;

  const { toggle, flag: showingConfig } = useToggle();

  return (
    <>
      <ResourceConfig showing={showingConfig} resource={resource} onClose={toggle} />
      <Grid item sm={6} textAlign="center">
        <Box onClick={toggle}>
          <ResourceIcon {...props} />
          <Typography>{resource.name}</Typography>
        </Box>
      </Grid>
    </>
  );
}

function ResourceIcon(props: { resource: Resource }) {
  if (props.resource.type === 'variable' && props.resource.dataType === 'Text') {
    return <TextSVG />;
  }

  if (props.resource.type === 'decision_split') {
    return <DecisionSplitSVG />;
  }

  return null;
}
