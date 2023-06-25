export interface AuthState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  accessToken: string | null;
  session: string | null;
  id: string | null;
  email: string | null;
  role: string | null;
  rememberMe: boolean;
}

export interface AuthReturnHook extends AuthState {
  isSuperAdmin: boolean;
  isAdmin: boolean;
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  login: (data: LoginData) => void;
  changePassword: (data: ChangePasswordData) => void;
  logout: () => void;
  setNewPassword: (password: string) => void;
  initPasswordReset: (email: string) => void;
  confirmPasswordReset: (data: ConfirmPasswordResetData) => void;
}

export interface AuthResponse {
  accessToken?: string;
  session?: string;
}

export interface AuthSession {
  accessToken: string;
  id: string;
  email: string;
  role: string;
  rememberMe: boolean;
  session?: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ChangePasswordData {
  email: string;
  password: string;
}

export interface ConfirmPasswordResetData {
  token: string;
  password: string;
}
