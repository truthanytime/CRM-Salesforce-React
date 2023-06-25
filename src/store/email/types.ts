export interface Email {
  emailFrom: string;
  emailTo: string;
  emailSubject: string;
  emailContent: string;
}

export interface EmailState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  emails: Email[];
  email: Email | null;
  connectedAccount: string;
}

export interface EmailReturnHook extends EmailState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  createEmail: (data: Partial<Email>) => void;
  getEmails: () => void;
  getEmail: (id: number) => void;
  deleteEmail: (id: number) => void;
  getConnectedAccount: () => void;
}
