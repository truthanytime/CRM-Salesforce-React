export interface IntegratedDataSource {
  data_source_id: string;
  name: string;
  integration_name_id: string;
  integration_id: string;
  integration_icon: string;
  integration_state_id: number;
  is_integrated: boolean;
  migration_status: string;
  migration_status_date: string;
  migration_id: string;
}

export interface DataSourceState {
  loading: boolean | string;
  error: boolean | string;
  success: boolean | string;
  data: {
    dataSources: IntegratedDataSource[];
    dataSource: IntegratedDataSource;
  };
}

export interface DataSourceReturnHook extends DataSourceState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  setLoading: (loading: string | boolean) => void;
  getDataSources: () => void;
}
