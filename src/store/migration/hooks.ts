import { useActionCreator } from 'hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'store/types';
import {
  deleteMigrationById,
  getMigrationById,
  getMigrations,
  getMigrationTableDataById,
  getMigrationTableFieldsById,
  getMigrationTablesById,
  initStates,
  postMigration,
  setError,
  setLoading,
  setMigrationId,
  setMigrationTableName,
  setSuccess,
} from './actions';
import { MigrationReturnHook } from './types';

export const useMigration = (): MigrationReturnHook => {
  const MigrationState = useSelector((state: RootState) => state.migration, shallowEqual);

  return {
    ...MigrationState,
    setError: useActionCreator(setError),
    setSuccess: useActionCreator(setSuccess),
    setLoading: useActionCreator(setLoading),
    getMigrations: useActionCreator(getMigrations),
    getMigrationById: useActionCreator(getMigrationById),
    postMigration: useActionCreator(postMigration),
    deleteMigrationById: useActionCreator(deleteMigrationById),
    getMigrationTablesById: useActionCreator(getMigrationTablesById),
    getMigrationTableFieldsById: useActionCreator(getMigrationTableFieldsById),
    getMigrationTableDataById: useActionCreator(getMigrationTableDataById),
    setMigrationId: useActionCreator(setMigrationId),
    setMigrationTableName: useActionCreator(setMigrationTableName),
    initMigrationStates: useActionCreator(initStates),
  };
};
