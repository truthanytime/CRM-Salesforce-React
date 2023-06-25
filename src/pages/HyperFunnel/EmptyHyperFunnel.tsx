import { Typography } from '@mui/material';

import { ReactComponent as BlocksIcon } from 'assets/icons/blocks.svg';
import { PrimaryButton } from 'components/ui';
import { Container, HyperFunnelContainer } from './ui';
import { HyperFunnelModal } from './components';
import { usePipelines } from './PipelinesProvider';
import { useToggle } from 'utils/toggle';

export default function EmptyHyperFunnel() {
  const { flag, toggle } = useToggle();
  const { pipelines } = usePipelines();

  if (pipelines.length) {
    return null;
  }
  return (
    <Container>
      <Typography variant="h2" sx={{ color: 'neutral.main', mt: 3, mx: 4 }}>
        HyperFunnel
      </Typography>

      <HyperFunnelContainer>
        <Typography variant="h3" component="p" sx={{ color: 'neutral.main' }}>
          What Pipelines & Funnels need for?
        </Typography>
        <BlocksIcon />
        <Typography variant="p14" component="p" sx={{ color: 'neutral.main', width: 560, textAlign: 'center' }}>
          A sales pipeline represents the stages a consumer goes through to become a customer. The sales funnel
          represents the number of prospects who make it through those stages. A sales pipeline looks at the different
          steps in the sales process, from gaining the lead to closing the sale.
        </Typography>
        <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.n400' }}>
          You have not added any products yet
        </Typography>
        <PrimaryButton onClick={toggle}>Create a Pipeline</PrimaryButton>
      </HyperFunnelContainer>

      <HyperFunnelModal open={flag} toggleOpen={toggle} />
    </Container>
  );
}
