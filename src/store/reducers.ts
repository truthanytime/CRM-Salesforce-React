import { combineReducers } from '@reduxjs/toolkit';

import accountReducer, { initialState as accountState } from './account/reducers';
import activityReducer, { initialState as activityState } from './activity/reducers';
import authReducer, { initialState as authState } from './auth/reducers';
import contactReducer, { initialState as contactState } from './contact/reducers';
import dataraptorReducer, { initialState as dataraptorState } from './dataRaptor/reducers';
import dataRaptorRuleReducer, { initialState as dataRaptorRuleState } from './dataRaptorRule/reducers';
import dataSourceReducer, { initialState as dataSourceState } from './dataSource/reducers';
import dealReducer, { initialState as dealState } from './deal/reducers';
import dealStageReducer, { initialState as dealStageState } from './dealStage/reducers';
import emailReducer, { initialState as emailState } from './email/reducers';
import integrationStatusReducer, { initialState as integrationStatusState } from './integration-status/reducers';
import integrationReducer, { initialState as integrationState } from './integration/reducers';
import migrationReducer, { initialState as migrationState } from './migration/reducers';
import tenantReducer, { initialState as tenantState } from './tenant/reducers';
import userReducer, { initialState as userState } from './user/reducers';
import socketReducer, { initialState as socketState } from './socket/reducers';
import duplicateDetectionReducer, { initialState as duplicateDetectionState } from './duplicateDetection/reducers';
import newRuleReducer, { initialState as newRuleInitialState } from './newRule/reducers';

export const initialRootState = {
  auth: authState,
  user: userState,
  contact: contactState,
  account: accountState,
  deal: dealState,
  email: emailState,
  dealStage: dealStageState,
  tenant: tenantState,
  integration: integrationState,
  integrationStatus: integrationStatusState,
  activity: activityState,
  dataSource: dataSourceState,
  migration: migrationState,
  dataRaptor: dataraptorState,
  dataRaptorRule: dataRaptorRuleState,
  socket: socketState,
  duplicateDetection: duplicateDetectionState,
  newRule: newRuleInitialState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  contact: contactReducer,
  account: accountReducer,
  deal: dealReducer,
  email: emailReducer,
  dealStage: dealStageReducer,
  tenant: tenantReducer,
  integration: integrationReducer,
  integrationStatus: integrationStatusReducer,
  activity: activityReducer,
  dataRaptorRule: dataRaptorRuleReducer,
  dataSource: dataSourceReducer,
  migration: migrationReducer,
  dataRaptor: dataraptorReducer,
  socket: socketReducer,
  duplicateDetection: duplicateDetectionReducer,
  newRule: newRuleReducer,
});

export default rootReducer;
