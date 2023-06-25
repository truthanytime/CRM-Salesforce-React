export interface DealStage {
  dealStageId: number;
  dealStageName: string;
  dealStageDescription: string;
  dealStageType: string;
}

export interface DealStageState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  dealStages: DealStage[];
  dealStage: DealStage | null;
}

export interface UpdateDealStageData {
  dealStageId: number;
  data: Partial<DealStage>;
}
export interface DealStageReturnHook extends DealStageState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getDealStages: () => void;
  getDealStage: (id: number) => void;
  updateDealStage: (data: UpdateDealStageData) => void;
  deleteDealStage: (id: number) => void;
}
