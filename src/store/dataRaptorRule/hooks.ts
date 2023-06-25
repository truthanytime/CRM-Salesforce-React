import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { DataRaptorReturnHook } from './types';
import {
  setError,
  setSuccess,
  setLoading,
  createRule,
  getRulesByMigrationAndTable,
  setSelectedRuleId,
  deleteRuleById,
  updateRuleById,
} from './actions';

export const useDataRaptorRule = (): DataRaptorReturnHook => {
  const dataRaptorRuleState = useSelector((state: RootState) => state.dataRaptorRule, shallowEqual);

  return {
    ...dataRaptorRuleState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setLoading: useActionCreator(setLoading),
    setSelectedRuleId: useActionCreator(setSelectedRuleId),
    createRule: useActionCreator(createRule),
    updateRuleById: useActionCreator(updateRuleById),
    getRulesByMigrationAndTable: useActionCreator(getRulesByMigrationAndTable),
    deleteRuleById: useActionCreator(deleteRuleById),
  };
};
