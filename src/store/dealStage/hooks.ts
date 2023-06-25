import { shallowEqual, useSelector } from 'react-redux';

import { useActionCreator } from 'hooks';
import { RootState } from 'store/types';
import { DealStageReturnHook } from './types';
import { setError, setSuccess, getDealStages, getDealStage, deleteDealStage, updateDealStage } from './actions';
import { DealStage } from 'store/dealStage/types';
import { useState } from 'react';

// export const useDealStage = (): DealStageReturnHook => {
//   const dealStageState = useSelector((state: RootState) => state.dealStage, shallowEqual);

//   return {
//     ...dealStageState,
//     setError: useActionCreator(setError),
//     setSuccess: useActionCreator(setSuccess),
//     getDealStages: useActionCreator(getDealStages),
//     getDealStage: useActionCreator(getDealStage),
//     updateDealStage: useActionCreator(updateDealStage),
//     deleteDealStage: useActionCreator(deleteDealStage),
//   };
// };

export function useDealStage() {
  const [dealStages, setDealStages] = useState<DealStage[]>(createDealStage());

  return {
    dealStages,
    setDealStages,
  };
}

function createDealStage() {
  const stages: DealStage[] = [
    {
      dealStageId: 1,
      dealStageName: 'Planning & Analysis',
      dealStageDescription: '',
      dealStageType: 'Sales',
    },
    {
      dealStageId: 2,
      dealStageName: 'Value Proposition',
      dealStageDescription: '',
      dealStageType: 'Sales',
    },
    {
      dealStageId: 3,
      dealStageName: 'Proposal',
      dealStageDescription: '',
      dealStageType: 'Sales',
    },
    {
      dealStageId: 4,
      dealStageName: 'Contract',
      dealStageDescription: '',
      dealStageType: 'Sales',
    },
    {
      dealStageId: 5,
      dealStageName: 'Closed',
      dealStageDescription: '',
      dealStageType: 'Sales',
    },
    {
      dealStageId: 6,
      dealStageName: 'Prospecting',
      dealStageDescription: '',
      dealStageType: 'Pre-Sales',
    },
    {
      dealStageId: 7,
      dealStageName: 'Outreach',
      dealStageDescription: '',
      dealStageType: 'Pre-Sales',
    },
    {
      dealStageId: 8,
      dealStageName: 'Engagement',
      dealStageDescription: '',
      dealStageType: 'Pre-Sales',
    },
    {
      dealStageId: 9,
      dealStageName: 'Discovery',
      dealStageDescription: '',
      dealStageType: 'Pre-Sales',
    },
    {
      dealStageId: 10,
      dealStageName: 'Qualification',
      dealStageDescription: '',
      dealStageType: 'Pre-Sales',
    },
  ];

  return stages;
}
