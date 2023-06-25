export interface Integration {
  id: number;
  applicationId: string;
  applicationName: string;
  applicationDescription: string;
  applicationIcon: string;
  applicationStatus: string;
  providerName?: string;
  providerLink?: string;
  totalInstalls?: string;
  categories?: string[];
  features?: string[];
  languages?: string;
  requirementPermissions?: string;
  subscriptionTitle?: string;
  subscriptions?: string;
  subscriptionLink?: string;
  type?: string;
}

export interface IntegrationState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  integrations: Integration[];
  integration: Integration | null;
  authorizeRedirectUrl: string;
  integrationStatus: string;
}

export interface IntegrationReturnHook extends IntegrationState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getIntegrations: () => void;
  getIntegration: (id: string) => void;
  setIntegrationStatus: (newStatus: string) => void;
  authorize: ({ id, onSuccess, onError }: { id: string; onSuccess?: () => void; onError?: () => void }) => void;
  authCallback: (payload: string) => void;
  uninstall: ({ id, onSuccess, onError }: { id: string; onSuccess?: () => void; onError?: () => void }) => void;
}
