import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import {
  addFilter,
  removeFilter,
  setError,
  setFields,
  setPageIndex,
  setPageSize,
  setRowsPerPage,
  setSuccess,
  setTotalDataCount,
  updateConfidenceScoreSectionState,
  updatePageStatus,
  initStates,
  setFilter,
  setSelectedTable,
  setSelectedMigration,
} from './actions';
import { DataRaptorReturnHook } from './types';

export const useDataRaptor = (): DataRaptorReturnHook => {
  const dataraptorState = useSelector((state: RootState) => state.dataRaptor, shallowEqual);

  return {
    ...dataraptorState,
    setSelectedMigration: useActionCreator(setSelectedMigration),
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setSelectedTable: useActionCreator(setSelectedTable),
    updateConfidenceScoreSectionState: useActionCreator(updateConfidenceScoreSectionState),
    updatePageStatus: useActionCreator(updatePageStatus),
    addFilter: useActionCreator(addFilter),
    setFilter: useActionCreator(setFilter),
    removeFilter: useActionCreator(removeFilter),
    setPageIndex: useActionCreator(setPageIndex),
    setPageSize: useActionCreator(setPageSize),
    setTotalDataCount: useActionCreator(setTotalDataCount),
    setRowsPerPage: useActionCreator(setRowsPerPage),
    setFields: useActionCreator(setFields),
    initDataRaptorStates: useActionCreator(initStates),
  };
};
