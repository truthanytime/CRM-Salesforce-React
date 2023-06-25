export enum UserType {
  SUPER_AMIN = 'super_admin',
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

export interface OptionValue<T> {
  label: string;
  value: T;
}
