import { Box, Skeleton, Typography } from '@mui/material';
import { ReactComponent as CheckBoxIcon } from 'assets/icons/boxCheckedGrey.svg';
import { FC, useEffect, useState } from 'react';
import { useActivity } from 'store/activity/hooks';
import { useContact } from 'store/contact/hooks';
import { ACTIVITY_TYPE_ID } from 'types';
import EmailActivity from './components/EmailActivity';
import { ActivityContainer, EmptyContainer } from './ui';

const AllActivity: FC = () => {
  const { getActivities, activities, successWrite, loading, setLoading } = useActivity();
  const { contact } = useContact();

  useEffect(() => {
    setLoading(true);
    if (contact) {
      getActivities(Number(contact?.contactId));
    }
  }, [successWrite, contact]);

  return (
    <ActivityContainer>
      {loading ? (
        <Box sx={{ padding: 4 }}>
          <Skeleton variant="text" width={520} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={520} height={118} />
        </Box>
      ) : activities?.length > 0 ? (
        <>
          {activities.map((activity, index) => {
            return activity?.activityTypeId === ACTIVITY_TYPE_ID.EMAIL && activity?.emailActivityDetails?.length ? (
              <EmailActivity key={index} {...activity} />
            ) : (
              <></>
            );
          })}
        </>
      ) : (
        <EmptyContainer>
          <CheckBoxIcon />
          <Typography variant="p12" width={220} sx={{ textAlign: 'center', lineHeight: 2 }}>
            {'You don’t have any activity yet.'} {'Choose an activity on toolbar'}
          </Typography>
        </EmptyContainer>
      )}
    </ActivityContainer>
  );
};

export default AllActivity;
