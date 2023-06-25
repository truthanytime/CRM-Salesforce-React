export interface DataRaptor {
  confidenceScoreShow: boolean;
}

export interface FilterIndex {
  name: string;
  type: string;
  operator: string;
  compare: string;
  xsd_type: string;
}

export interface DataRaptorState {
  error: boolean | string;
  success: boolean | string;
  confidenceScoreSectionState: boolean;
  pageStatus: string;
  filters: FilterIndex[];
  fields: FilterIndex[];
  selectedTable: string;
  values: string[];
  totalDataCount: number;
  pageIndex: number;
  pageSize: number;
  rowsPerPage: number[];
  selectedMigration: string;
}

export interface DataRaptorReturnHook extends DataRaptorState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  updateConfidenceScoreSectionState: () => void;
  updatePageStatus: (status: string) => void;
  addFilter: (filter: FilterIndex) => void;
  setFilter: (filter: { name: string; operator: string; compare: string }) => void;
  removeFilter: (filter: { name: string; type: string }) => void;
  setPageIndex: (pageIndex: number) => void;
  setSelectedTable: (tableName: string) => void;
  setPageSize: (pageSize: number) => void;
  setTotalDataCount: (totalDataCount: number) => void;
  setRowsPerPage: (rowsPerPage: number[]) => void;
  setFields: (fields: FilterIndex[]) => void;
  initDataRaptorStates: () => void;
  setSelectedMigration: (migrationId: string) => void;
}
