import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { StyledAccordion, StyledAccordionSummary, StyledAccordionDetails } from 'pages/HyperFunnel/ui';
import Typography from '@mui/material/Typography';
import { ReactComponent as GetDataSVG } from 'assets/icons/touchPoints/getData.svg';
import { ReactComponent as UpdateDataSVG } from 'assets/icons/touchPoints/updateData.svg';
import { ReactComponent as CreateDataSVG } from 'assets/icons/touchPoints/createData.svg';

import { ReactComponent as MeetingSVG } from 'assets/icons/touchPoints/meeting.svg';
import { ReactComponent as SMSSVG } from 'assets/icons/touchPoints/sms.svg';
import { ReactComponent as CallSVG } from 'assets/icons/touchPoints/calls.svg';
import { ReactComponent as EmailSVG } from 'assets/icons/touchPoints/email.svg';

import { ReactComponent as WhitePageSVG } from 'assets/icons/touchPoints/whitepage.svg';
import { ReactComponent as TechnicalSVG } from 'assets/icons/touchPoints/technical.svg';
import { ReactComponent as VideoSVG } from 'assets/icons/touchPoints/video.svg';
import { ReactComponent as LinkSVG } from 'assets/icons/touchPoints/link.svg';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { DragEvent } from 'react';

export type TouchPoint = {
  label: string;
  value: string;
  category: 'Data Source' | 'Activity' | 'Content';
};

export default function Touchpoints() {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TouchPointList />
    </Box>
  );
}

function TouchPointList() {
  const points = getTouchPointDefaults();

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.preventDefault();
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>DATA SOURCE</StyledAccordionSummary>
        <StyledAccordionDetails>
          <Grid container>
            <Grid item sm={6} textAlign="center">
              <div onDragStart={(event: DragEvent) => onDragStart(event, points[0].value)}>
                <GetDataSVG />
                <Typography>{points[0].label}</Typography>
              </div>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <UpdateDataSVG />
              <Typography>{points[1].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <CreateDataSVG />
              <Typography>{points[2].label}</Typography>
            </Grid>
          </Grid>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>ACTIVITIES</StyledAccordionSummary>
        <StyledAccordionDetails>
          <Grid container>
            <Grid item sm={6} textAlign="center">
              <MeetingSVG />
              <Typography>{points[3].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <CallSVG />
              <Typography>{points[4].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <EmailSVG />
              <Typography>{points[5].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <SMSSVG />
              <Typography>{points[6].label}</Typography>
            </Grid>
          </Grid>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>RESOURCES/CONTENTS</StyledAccordionSummary>
        <StyledAccordionDetails>
          <Grid container>
            <Grid item sm={6} textAlign="center">
              <WhitePageSVG />
              <Typography>{points[7].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <TechnicalSVG />
              <Typography>{points[8].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <VideoSVG />
              <Typography>{points[9].label}</Typography>
            </Grid>
            <Grid item sm={6} textAlign="center">
              <LinkSVG />
              <Typography>{points[10].label}</Typography>
            </Grid>
          </Grid>
        </StyledAccordionDetails>
      </StyledAccordion>
    </>
  );
}

function getTouchPointDefaults(): TouchPoint[] {
  const touchPoints: TouchPoint[] = [
    {
      label: 'Get Data',
      value: 'Get Data',
      category: 'Data Source',
    },
    {
      label: 'Update Data',
      value: 'Update Data',
      category: 'Data Source',
    },
    {
      label: 'Create Data',
      value: 'Create Data',
      category: 'Data Source',
    },
    {
      label: 'Meeting',
      value: 'Meeting',
      category: 'Activity',
    },
    {
      label: 'Call',
      value: 'Call',
      category: 'Activity',
    },
    {
      label: 'Email',
      value: 'Email',
      category: 'Activity',
    },
    {
      label: 'SMS',
      value: 'SMS',
      category: 'Activity',
    },
    {
      label: 'Whitepage',
      value: 'Whitepage',
      category: 'Content',
    },
    {
      label: 'Technical',
      value: 'Technical',
      category: 'Content',
    },
    {
      label: 'Video',
      value: 'Video',
      category: 'Content',
    },
    {
      label: 'Link',
      value: 'Link',
      category: 'Content',
    },
  ];

  return touchPoints;
}
