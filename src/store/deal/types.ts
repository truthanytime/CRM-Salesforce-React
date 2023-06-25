import { Account } from 'store/account/types';
import { User } from 'store/user/types';

export const DEAL_STAGE_OPTIONS = [
  { label: 'Prospect', value: 'prospect' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'Discovery', value: 'discovery' },
  { label: 'Negotiation', value: 'negotiation' },
  { label: 'Closed Won', value: 'closed_won' },
  { label: 'Closed Lost', value: 'closed_lost' },
];
export interface Deal {
  dealId: number;
  dealName: string;
  description: string;
  pipelineId: number;
  tenantId: number;
  tenantUserId: number;
  accountId: number;
  contactId: number;
  campaignId: number;
  createdBy: number;
  totalAmount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  createdDate: Date;
  updateDate: Date;
}

export interface DealState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  deals: Deal[];
  deal: Deal | null;
}

export interface UpdateDealData {
  dealId: number;
  data: Partial<Deal>;
}
export interface DealReturnHook extends DealState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getDeals: () => void;
  getDeal: (id: number) => void;
  updateDeal: (data: UpdateDealData) => void;
  deleteDeal: (id: number) => void;
}
