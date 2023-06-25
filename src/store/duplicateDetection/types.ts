export enum DuplicateDetectionPageStatus {
  GROUPS = 'grouped',
  ROWS = 'rows',
}

export interface DuplicateDetectionState {
  error: boolean | string;
  success: boolean | string;
  loading: boolean;
  mergeModalStatus: boolean;
  pageStatus: DuplicateDetectionPageStatus;
  rowsPageData: any[];
  mergingRows: any[];
  mergedRow: any;
}

export interface DuplicateDetectionHook extends DuplicateDetectionState {
  setError: (error: boolean | string) => void;
  setSuccess: (success: boolean | string) => void;
  setLoading: (loading: boolean) => void;
  setMergeModalStatus: (status: boolean) => void;
  setPageStatus: (status: DuplicateDetectionPageStatus) => void;
  setRowsPageData: (data: any[]) => void;
  setMergingRows: (data: any[]) => void;
  setMergedRow: (data: any) => void;
}
