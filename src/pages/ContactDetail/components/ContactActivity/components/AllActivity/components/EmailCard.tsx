import { Box, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ReactComponent as ExpandMoreIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ContactIcon } from 'assets/icons/contactAvatar.svg';
import { TextLinkButton } from 'components/ui';
import * as React from 'react';
import { FC } from 'react';
import { ACTIVITY_STATUS } from 'types';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginRight: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = {
  toggleThread?: () => void;
  threadLength?: number | null;
  from: string;
  to: string;
  subject: string;
  body: string;
  actionText: string;
  statusText?: string;
  dateTime: string;
};

const EmailCard: FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { toggleThread, threadLength, from, to, subject, body, actionText, statusText, dateTime } = props;
  const chipBgColor = statusText === ACTIVITY_STATUS.SPAM ? 'orange.main' : 'green.main';

  return (
    <Card sx={{ width: 520, mb: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'background.paper' }} aria-label="contact">
            <ContactIcon />
          </Avatar>
        }
        title={
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" gap={0.5} alignItems="center" width={'70%'}>
              <Typography variant="p14">{from}</Typography>
              <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                {actionText}
              </Typography>
              <Chip label={String(statusText)} sx={{ ml: 1, backgroundColor: chipBgColor, color: 'neutral.white' }} />
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" alignItems="center" width={'30%'}>
              <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                {dateTime}
              </Typography>
            </Box>
          </Box>
        }
        subheader={
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" gap={0.5} alignItems="center" width={'50%'}>
              <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                {'to'}
              </Typography>
              <Typography variant="p14">{to}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
              textAlign="right"
              gap={0.5}
              width={'50%'}
            >
              {threadLength && (
                <TextLinkButton href="#" sx={{ fontSize: 12, justifyContent: 'flex-end' }} onClick={toggleThread}>
                  {`Show thread (${threadLength})`}
                </TextLinkButton>
              )}
              <TextLinkButton href="#" sx={{ fontSize: 12, justifyContent: 'flex-end', minWidth: 54 }}>
                Forward
              </TextLinkButton>
              <TextLinkButton href="#" sx={{ fontSize: 12, justifyContent: 'flex-end', minWidth: 40 }}>
                Reply
              </TextLinkButton>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.primary">
          {subject}
        </Typography>
        {!expanded && (
          <Typography
            variant="body2"
            color="text.secondary"
            width="488px"
            height="50px"
            noWrap
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </CardContent>
      <CardActions>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          {!expanded && (
            <TextLinkButton href="#" style={{ fontSize: 12 }}>
              {'Show more'}
            </TextLinkButton>
          )}
          <ExpandMoreIcon style={{ marginLeft: 4 }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ padding: '0 16px' }}>
          <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: body }} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EmailCard;
