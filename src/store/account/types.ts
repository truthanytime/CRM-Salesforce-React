import { Contact } from 'store/contact/types';
import { ContactInformation } from 'store/types';
import { User } from 'store/user/types';

export const ACCOUNT_INDUSTRY_OPTIONS = [{ label: 'Banking', value: 0 }];

export const ACCOUNT_STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

export const ACCOUNT_TYPE_OPTIONS = [{ label: 'Startup', value: 'Startup' }];

export interface Account {
  accountId: number;
  accountName: string;
  description: string;
  company: string;
  webURL: string;
  accountStageId: number;
  accountTypeId: number;
  accountStatus: boolean;
  industryId: number;
  foundedDate: Date;
  employeesNumber: number;
  revenuePerYear: number;
  childOf: number;
  createDate: Date;
  updateDate: Date;
  createdBy: number;
  tenantUser: User;
  contactInfo: ContactInformation;
  contacts: Contact[];
}

export interface AccountState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accounts: Account[];
  account: Account | null;
}

export interface UpdateAccountData {
  accountId: number;
  data: Partial<Account>;
}

export interface AccountReturnHook extends AccountState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getAccounts: () => void;
  getAccount: (id: number) => void;
  updateAccount: (data: UpdateAccountData) => void;
  deleteAccount: (id: number) => void;
}
