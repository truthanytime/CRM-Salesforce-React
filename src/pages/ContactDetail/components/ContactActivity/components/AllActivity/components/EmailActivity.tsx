import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { ReactComponent as EmailIcon } from 'assets/icons/emailCircleGreen.svg';
import { format } from 'date-fns';
import { FC, useState } from 'react';
import { Activity, EmailActivityDetail, EmailData } from 'store/activity/types';
import { useContact } from 'store/contact/hooks';
import { useUser } from 'store/user/hooks';
import { EMAIL_TYPE_ID } from 'types';
import EmailCard from './EmailCard';
import EmailThreadModal from './EmailThreadModal';

type Props = Partial<Activity>;

const EmailActivity: FC<Props> = (props) => {
  const { user } = useUser();
  const { contact } = useContact();
  const { emailActivityDetails } = props;

  const emailData = (emailDetail?: EmailActivityDetail, isReply?: boolean, overrideSubject?: string): EmailData => {
    const from =
      (emailDetail?.emailTypeId === EMAIL_TYPE_ID.OUTGOING
        ? user?.userName
        : `${contact?.lastName} ${contact?.firstName}`) || '';

    const to =
      (emailDetail?.emailTypeId === EMAIL_TYPE_ID.OUTGOING
        ? `${contact?.lastName} ${contact?.firstName}`
        : user?.userName) || '';

    const subject = overrideSubject || emailDetail?.emailSubject || '';
    const body = emailDetail?.emailBody || '';
    const dateYearAndTime = format(new Date(String(emailDetail?.emailDate)), 'PPp').split(',');
    const dateTime = `${dateYearAndTime[0]} ${dateYearAndTime[2]}`;
    const actionText = isReply && emailDetail?.emailTypeId === EMAIL_TYPE_ID.INCOMING ? 'replied' : 'send email';
    const statusText = emailDetail?.emailTypeId === EMAIL_TYPE_ID.OUTGOING ? 'sent' : 'opened';
    return { from, to, subject, body, dateTime, actionText, statusText };
  };

  const firstEmailDetail = emailActivityDetails?.[0];
  const lastEmailDetail = emailActivityDetails?.[(emailActivityDetails?.length || 0) - 1];
  const lastEmailData: EmailData = emailData(lastEmailDetail, Number(emailActivityDetails?.length) > 1);
  const mainEmailData: EmailData = emailData(lastEmailDetail, true, firstEmailDetail?.emailSubject);
  const emailThreads: EmailData[] = emailActivityDetails?.map((detail, index) => emailData(detail, index > 0)) || [];

  const threadLength = Number(emailActivityDetails?.length) > 1 ? emailActivityDetails?.length : null;
  const [threadOpen, setThreadOpen] = useState<boolean>(false);
  const toggleThread = () => {
    setThreadOpen(!threadOpen);
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" gap={1}>
      <Avatar sx={{ bgcolor: 'green.main' }} aria-label="email">
        <EmailIcon />
      </Avatar>
      <EmailCard {...{ toggleThread, threadLength, ...lastEmailData }} />
      <>
        {threadLength && (
          <EmailThreadModal
            open={threadOpen}
            toggleOpen={toggleThread}
            mainEmailData={mainEmailData}
            emailThreads={emailThreads}
          />
        )}
      </>
    </Box>
  );
};

export default EmailActivity;
