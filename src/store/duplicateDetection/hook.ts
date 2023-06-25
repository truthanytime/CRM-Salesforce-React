import { useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';

import {
  setError,
  setLoading,
  setSuccess,
  setMergeModalStatus,
  setPageStatus,
  setRowPageData,
  setMergedRow,
  setMergingRows,
} from './actions';

export const useDuplicateDetection = () => {
  const duplicateDetectionState = useSelector((state: RootState) => state.duplicateDetection);

  return {
    ...duplicateDetectionState,
    setError: useActionCreator(setError),
    setLoading: useActionCreator(setLoading),
    setSuccess: useActionCreator(setSuccess),
    setMergeModalStatus: useActionCreator(setMergeModalStatus),
    setPageStatus: useActionCreator(setPageStatus),
    setRowPageData: useActionCreator(setRowPageData),
    setMergedRow: useActionCreator(setMergedRow),
    setMergingRows: useActionCreator(setMergingRows),
  };
};
