import { CreateActivityDto } from 'http/activity';
import { ACTIVITY_TYPE_ID, CONTACT_STAGE_ID, EMAIL_TYPE_ID } from 'types';

export interface EmailActivityDetail {
  emailFrom: string;
  emailTo: string;
  emailSubject: string;
  emailBody: string;
  emailDate: Date;
  emailTime: Date;
  emailTypeId?: EMAIL_TYPE_ID;
  hasAttachment: boolean;
}

export type EmailData = {
  from: string;
  to: string;
  subject: string;
  body: string;
  dateTime: string;
  actionText: string;
  statusText: string;
};

export interface Activity {
  activityId: number;
  activityTypeId: ACTIVITY_TYPE_ID;
  status: string;
  startDate: Date;
  dueDate: Date;
  contactStageId: CONTACT_STAGE_ID;
  emailActivityDetails?: EmailActivityDetail[];
  // callActivityDetails?: [],
}

export interface ActivityState {
  loading: boolean;
  error: boolean;
  successRead: boolean;
  successWrite: boolean;
  statusMessage?: string;
  activities: Activity[];
  activity: Activity | null;
}

export interface ActivityReturnHook extends ActivityState {
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  setSuccessRead: (success: boolean) => void;
  setSuccessWrite: (success: boolean) => void;
  getActivities: (contactId: number) => void;
  createActivity: (data: Partial<CreateActivityDto>) => void;
}
