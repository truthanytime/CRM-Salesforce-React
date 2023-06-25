import { Activity, EmailActivityDetail } from 'store/activity/types';
import { ACTIVITY_TYPE_ID, CONTACT_STAGE_ID, SALE_PHASE_ID } from 'types';
import { apiCall } from '../index';

export interface CreateActivityDto {
  activityTypeId: ACTIVITY_TYPE_ID;
  salePhaseId: SALE_PHASE_ID;
  tenantId: number;
  accountId: number;
  contactId: number;
  status: string;
  startDate: Date;
  dueDate: Date;
  contactStageId: CONTACT_STAGE_ID;
  emailActivityDetail?: Partial<EmailActivityDetail>;
  // callActivityDetail?: {}
}

export const getActivities = (contactId: number): Promise<Activity[]> => {
  const url = `/activity?contactId=${contactId}`;
  return apiCall({ method: 'get', url });
};
export const createActivity = (data: Partial<CreateActivityDto>): Promise<Activity> =>
  apiCall({ method: 'post', url: '/activity', data });
