import React, { useState, useEffect, useCallback } from 'react';
import { apiCall } from 'http/index';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';
import { FetchPipeline, Pipeline, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { useParams } from 'react-router-dom';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import StorageIcon from '@mui/icons-material/Storage';
import PinIcon from '@mui/icons-material/Pin';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

export const DEFAULT_DATA_TYPES: Record<string, JSX.Element> = {
  Text: <TextFieldsIcon />,
  Record: <StorageIcon />,
  Number: <PinIcon />,
  Currency: <AttachMoneyIcon />,
  Boolean: <EmojiFlagsIcon />,
};

export type ResourceType = {
  label: string;
  value: string;
};
export type Resource = {
  id: number | null;
  type: string;
  name: string;
  description: string;
  dataType: 'Text' | 'Record' | 'Number' | 'Currency' | 'Boolean';
};

type JourneyBuilderContextProps = {
  pipeline: FetchPipeline;
  resources: Resource[];
  resourceTypes: ResourceType[];
  createResource: (newResource: Resource) => void;
  removeResource: (resourceId: number) => void;
  updateResource: (resourceId: number, newResource: Resource) => void;
};

export const JourneyBuilderContext = React.createContext<undefined | JourneyBuilderContextProps>(undefined);

export default function JourneyBuilderProvider(props: { children: JSX.Element | JSX.Element[]; pipelineId: number }) {
  const { children, pipelineId } = props;
  const { pipelines } = usePipelines();
  const [resources, setResources] = useState<Resource[]>([]);

  const { data: savedResources, loading } = useGetAllResources();

  const pipeline = pipelines.filter((p) => p.pipelineId === pipelineId)[0];

  const resourceTypes = getResourceTypes();

  useEffect(() => {
    if (!savedResources) {
      return;
    }
    setResources(savedResources);
  }, [savedResources]);

  if (!pipeline) {
    return <div>No Pipelline Configured.</div>;
  }

  if (loading) {
    return <Loader />;
  }

  const createResource = (newResource: Resource) => {
    createNewResource(newResource).then((d) => {
      setResources([...resources, d]);
    });
  };
  const removeResource = (resourceId: number) => {
    deleteResource(resourceId).then(() => {
      const filtered = resources.filter((r) => r.id !== resourceId);
      setResources(filtered);
    });
  };
  const updateR = (resourceId: number, newResource: Resource) => {
    updateResource(resourceId, newResource).then(() => {
      const updated = resources.map((r) => {
        if (r.id === resourceId) {
          return { ...newResource, id: resourceId };
        }
        return r;
      });
      setResources(updated);
    });
  };
  return (
    <JourneyBuilderContext.Provider
      value={{
        createResource,
        removeResource,
        updateResource: updateR,
        resources,
        pipeline,
        resourceTypes,
      }}
    >
      {children}
    </JourneyBuilderContext.Provider>
  );
}

export function useJourneyBuilder() {
  const context = React.useContext(JourneyBuilderContext);

  if (!context) {
    throw new Error('useJourneyBuilder must be used within JourneyBuilderProvider');
  }

  return context;
}

function useGetAllResources() {
  const { id: pipelineId } = useParams();
  const url = `pipeline/${pipelineId}/resources`;
  const fetch = useCallback(() => apiCall<Resource[]>({ method: 'GET', url }), [url]);
  return useAsync(fetch);
}

async function createNewResource(data: Resource) {
  return apiCall<Resource>({ method: 'POST', url: '/resource', data });
}

async function updateResource(id: number, data: Resource) {
  return apiCall<Resource>({ method: 'PUT', url: `/resource/${id}`, data });
}

async function deleteResource(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/resource/${id}` });
}

function getResourceTypes(): ResourceType[] {
  return [
    {
      label: 'Variable',
      value: 'variable',
    },
    {
      label: 'Decision Split',
      value: 'decision_split',
    },
  ];
}
