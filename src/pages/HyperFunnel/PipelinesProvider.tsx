import React, { useState, useEffect, createContext } from 'react';
import { User } from 'store/user/types';
import { apiCall } from 'http/index';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';
import { Product } from 'providers/ProductsProvider';
export interface DealStage {
  dealStageId: number;
  dealStageName: string;
  dealStageDescription: string;
}

export interface ContactStage {
  contactStageId: number;
  contactStageName: string;
  contactStageDescription: string;
}

export interface BaseStage {
  type: 'Pre-Sales' | 'Sales' | 'Post-Sales';
  baseStageId: number;
  title: string;
  description: string;
}

export interface PipelineProduct {
  pipelineId?: number;
  productId?: number;
}
export interface PipelineStage extends BaseStage {
  createdAt?: Date;
  pipelineStageName?: string;
  pipelineStageDescription?: string;
  pipelineStageOwners?: User[];
  pipelineStageCategory?: string;
  baseStage?: BaseStage;
}

export type PipelineDocument = {
  type: 'document' | 'link';
  location: string;
  size?: number;
  name?: string;
  fileKey?: string;
  extention?: string;
};

export type Pipeline = {
  pipelineName: string;
  pipelineDescription: string;
  pipelineStages: PipelineStage[];
  pipelineDocuments: PipelineDocument[];
  pipelineUsers: User[];
  pipelineProducts: Product[];
};

export enum PipelineFormSteps {
  FIRST,
  SECOND,
  SECOND_DOCUMENTS,
  SECOND_OWNERS,
  SECOND_PRODUCTS,
  THIRD,
}
export const defaultValues: Pipeline = {
  pipelineName: '',
  pipelineDescription: '',
  pipelineStages: [],
  pipelineDocuments: [],
  pipelineUsers: [],
  pipelineProducts: [],
};
export const PipelineFormContext = createContext<{
  form: Pipeline;
  // update: (name: string, value: any) => void;
  step: number;
  setStep: (step: number) => void;
  onClose: () => void;
}>({
  form: defaultValues,
  // update: () => {},
  step: PipelineFormSteps.FIRST,
  setStep: console.log,
  onClose: console.log,
});

type PipelinesContextProps = {
  pipelines: FetchPipeline[];
  baseStages: BaseStage[];
  createPipeline: (newPipeline: Pipeline) => void;
  setEditPipeline: (pipelineId: number | null) => void;
  editPipeline: number | null;
  deletePipeline: (id: number) => void;
  selectedPipeline: FetchPipeline | null;
  setSelectedPipeline: (pipeline: FetchPipeline | null) => void;
};

export type FetchPipeline = Pipeline & {
  pipelineId: number;
};

export const PipelinesContext = React.createContext<undefined | PipelinesContextProps>(undefined);

export default function PipelinesProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const [pipelines, setPipelines] = useState<FetchPipeline[]>([]);
  const [editPipeline, setEditPipeline] = useState<number | null>(null);

  const [selectedPipeline, setSelectedPipeline] = useState<FetchPipeline | null>(null);
  const { data: savedPipelines, loading } = useAsync(getAllPipelines);

  const baseStages = createBaseStages();
  useEffect(() => {
    if (!savedPipelines) {
      return;
    }

    setPipelines(savedPipelines);
  }, [savedPipelines]);

  const createPipeline = (newPipeline: Pipeline) => {
    if (editPipeline) {
      updatePipeline(editPipeline, newPipeline).then((data: FetchPipeline) => {
        const updated = pipelines.map((p) => {
          if (p.pipelineId === editPipeline) {
            return data;
          }
          return p;
        });
        setPipelines(updated);
      });
      return;
    }
    createNewPipeline(newPipeline).then((data: FetchPipeline) => {
      setPipelines([...pipelines, data]);
    });
  };

  const remove = (id: number) => {
    deletePipeline(id).then(() => {
      const removed = pipelines.filter((p) => p.pipelineId !== id);
      setPipelines(removed);
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <PipelinesContext.Provider
      value={{
        pipelines,
        baseStages,
        createPipeline,
        setEditPipeline,
        editPipeline,
        deletePipeline: remove,
        setSelectedPipeline,
        selectedPipeline,
      }}
    >
      {props.children}
    </PipelinesContext.Provider>
  );
}

export function usePipelines() {
  const context = React.useContext(PipelinesContext);

  if (!context) {
    throw new Error('usePipelineContext must be used within PipelinesProvider');
  }

  return context;
}

type Fetched = FetchPipeline & {
  pipelineProducts: PipelineProduct[];
};

async function getAllPipelines() {
  return apiCall<Fetched[]>({ method: 'GET', url: '/pipeline' });
}

async function getAllBaseStages() {
  return apiCall<BaseStage[]>({ method: 'GET', url: '/basestage' });
}

async function createNewPipeline(data: Pipeline) {
  return apiCall<FetchPipeline>({ method: 'POST', url: '/pipeline', data });
}

async function updatePipeline(id: number, data: Pipeline) {
  return apiCall<FetchPipeline>({ method: 'PUT', url: `/pipeline/${id}`, data });
}

async function deletePipeline(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/pipeline/${id}` });
}

function createBaseStages(): BaseStage[] {
  return [
    {
      type: 'Pre-Sales',
      baseStageId: 1,
      title: 'Prospecting',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Pre-Sales',
      baseStageId: 2,
      title: 'Outreach',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Pre-Sales',
      baseStageId: 3,
      title: 'Engagement',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Pre-Sales',
      baseStageId: 4,
      title: 'Discovery',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Pre-Sales',
      baseStageId: 5,
      title: 'Qualification',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Sales',
      baseStageId: 6,
      title: 'Planning & Analysis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Sales',
      baseStageId: 7,
      title: 'Value Proposition',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Sales',
      baseStageId: 8,
      title: 'Proposal',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Sales',
      baseStageId: 9,
      title: 'Contract',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
    {
      type: 'Sales',
      baseStageId: 10,
      title: 'Closed',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elit, nulla massa nisl pretium, pulvinar rutrum facilisis dis. Viverra a, ipsum risus, suspendisse velit. Vulputate at ullamcorper tempor, vitae.',
    },
  ];
}
