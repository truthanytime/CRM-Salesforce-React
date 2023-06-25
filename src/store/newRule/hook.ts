import { useActionCreator } from 'hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'store/types';
import {
  setCategory,
  setDepartment,
  setDescription,
  setRiskLevel,
  setRuleName,
  setViolationScore,
  setWhere,
  resetAll,
} from './actions';

export const useNewRuleStore = () => {
  const data = useSelector((state: RootState) => state.newRule);

  return {
    ...data,
    setRuleName: useActionCreator(setRuleName),
    setCategory: useActionCreator(setCategory),
    setDescription: useActionCreator(setDescription),
    setViolationScore: useActionCreator(setViolationScore),
    setRiskLevel: useActionCreator(setRiskLevel),
    setDepartment: useActionCreator(setDepartment),
    setWhere: useActionCreator(setWhere),
    resetAll: useActionCreator(resetAll),
  };
};
