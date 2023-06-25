import { Account } from 'store/account/types';
import { ContactInformation } from 'store/types';
import { User } from 'store/user/types';

export const CONTACT_SOURCE_OPTIONS = [
  { label: 'Website', value: 'website' },
  { label: 'Referral', value: 'referral' },
  { label: 'Webinar', value: 'webinar' },
  { label: 'Social', value: 'social' },
  { label: 'Media', value: 'media' },
  { label: 'Tradeshow', value: 'tradeshow' },
  { label: 'Campaign', value: 'campaign' },
];

export const CONTACT_STATUS_OPTIONS = [
  { label: 'Raw', value: 'raw' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'Working', value: 'working' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Nurtured', value: 'nurtured' },
  { label: 'Unqualified', value: 'unqualified' },
];

export const CONTACT_STAGE_OPTIONS = [
  { label: 'Cold', value: 'Cold' },
  { label: 'Warm', value: 'Warm' },
  { label: 'Hot', value: 'Hot' },
  { label: 'MQL', value: 'MQL' },
  { label: 'SQL', value: 'SQL' },
  { label: 'SAL', value: 'SAL' },
  { label: 'Customer', value: 'Customer' },
];

export enum ContactType {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const CONTACT_TYPE_OPTIONS = [
  { label: 'Active', value: ContactType.ACTIVE },
  { label: 'Inactive', value: ContactType.INACTIVE },
];
export interface Contact {
  contactId: number;
  ssid: string;
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  image: string;
  contactStageId: number;
  contactSourceId: number;
  contactStatusId: number;
  accountId: number;
  createDate: Date;
  updateDate: Date;
  contactType: ContactType;
  workDepartmentId: number;
  reportsTo: number;
  createdBy: number;
  tenantUser: User;
  //contactInfo
  contactInfo: ContactInformation;
  accout: Account;
}

export interface ContactState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  contacts: Contact[];
  contact: Contact | null;
}

export interface UpdateContactData {
  contactId: number;
  data: Partial<Contact>;
}

export interface ContactReturnHook extends ContactState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getContacts: () => void;
  getContact: (id: number) => void;
  updateContact: (data: UpdateContactData) => void;
  deleteContact: (id: number) => void;
}
