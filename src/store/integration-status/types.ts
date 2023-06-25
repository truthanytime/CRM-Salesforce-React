export enum APPLICATION_STATUS {
  DEFAULT = '',
  INSTALLED = 'installed',
  NOT_INSTALLED = 'not-installed',
}

export enum APPLICATION_STATUS_LABEL {
  DEFAULT = '',
  INSTALLED = 'Uninstall',
  NOT_INSTALLED = 'Install',
  INSTALLING = 'Installing...',
  UNINSTALLING = 'Uninstalling...',
  LOADING = 'Loading...',
}

export const mapStatusLabel = (status: APPLICATION_STATUS | string): APPLICATION_STATUS_LABEL => {
  const map = {
    [APPLICATION_STATUS.INSTALLED.toString()]: APPLICATION_STATUS_LABEL.INSTALLED,
    [APPLICATION_STATUS.NOT_INSTALLED.toString()]: APPLICATION_STATUS_LABEL.NOT_INSTALLED,
    [APPLICATION_STATUS.DEFAULT.toString()]: APPLICATION_STATUS_LABEL.DEFAULT,
  };
  if (status in map) return map[status];
  return APPLICATION_STATUS_LABEL.LOADING;
};

export interface IntegrationSession {
  applicationStatus: APPLICATION_STATUS | string;
  statusLabel: APPLICATION_STATUS_LABEL;
}

export interface IntegrationStatusState {
  loading: boolean | string;
  error: boolean | string;
  success: boolean | string;
  data: IntegrationSession;
}

export interface IntegrationReturnHook extends IntegrationStatusState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: IntegrationSession) => void;
  setLoading: (loading: string | boolean) => void;
}
