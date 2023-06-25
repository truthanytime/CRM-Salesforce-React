import { UserType } from 'core/types';
import { ContactInformation } from 'store/types';

export interface User {
  userId: number;
  userName: string;
  userEmail: string;
  userType: UserType;
  userActive: boolean;
  tenantId?: number;
  userCreatedAt: Date;
  userUpdatedAt: Date;
  contactInfo: ContactInformation;
}

export interface UserState {
  loading: boolean;
  error: string | boolean;
  success: string | boolean;
  user: User | null;
  users: User[];
}

export interface UserReturnHook extends UserState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getCurrentUser: () => void;
  getUsers: () => void;
  updateUser: (data: UpdateUserData) => void;
}

export interface CreateUserData {
  userName: string;
  userEmail: string;
  userType: UserType;
  phoneNumber: string;
  mobileNumber?: string;
  profileJobRole?: string;
}

export interface UpdateUserData {
  userId: number;
  user?: Partial<Omit<User, 'contactInfo'>>;
  contactInfo?: Partial<ContactInformation>;
}
