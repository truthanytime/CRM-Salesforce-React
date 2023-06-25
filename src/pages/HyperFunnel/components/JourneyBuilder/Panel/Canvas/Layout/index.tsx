import { FunctionComponent, useCallback } from 'react';
import ReactFlow, {
  Background,
  Node,
  NodeTypes,
  useReactFlow,
  MarkerType,
  ReactFlowProvider,
  Controls,
  MiniMap,
} from 'react-flow-renderer';

import { useJourneyBuilder } from '../../../JourneyBuilderProvider';
import ResizeRotateNode from 'pages/HyperFunnel/components/JourneyBuilder/Panel/ResizeRotateNode';

const nodeTypes: NodeTypes = {
  resizeRotate: ResizeRotateNode as FunctionComponent,
};
const proOptions = { account: 'paid-pro', hideAttribution: true };

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: '#9ca8b3' },
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  zIndex: 1,
};

export default function CanvasLayout() {
  return (
    <ReactFlowProvider>
      <ReactFlowPro />
    </ReactFlowProvider>
  );
}

function ReactFlowPro() {
  const { getNodes, setNodes } = useReactFlow();
  const { layoutNodes } = useSubPanels();

  const onMoveStart = useCallback(() => {
    const nodes = getNodes().map((n) => {
      n.selected = false;
      return n;
    });

    setNodes(nodes);
  }, [getNodes, setNodes]);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      defaultNodes={layoutNodes}
      defaultEdgeOptions={defaultEdgeOptions}
      onMoveStart={onMoveStart}
      proOptions={proOptions}
      minZoom={0.5}
      maxZoom={2}
      defaultZoom={1}
      style={{ height: 'calc( 100vh - 56px - 64px )' }}
    >
      <Controls />
      <MiniMap />
      {/* <Background /> */}
    </ReactFlow>
  );
}

function useSubPanels() {
  const { pipeline } = useJourneyBuilder();
  const { pipelineStages } = pipeline;

  const colors = ['#ff000033', '#3079d633', '#30d65933', '#c1dc1833', '#dc6a1833', '#dc18c033'];

  const layoutNodes: Node[] = pipelineStages.map((pipelineStage, index) => {
    const unitWidth = 500;
    const node: Node = {
      id: index.toString(),
      data: {
        label: `${pipelineStage.pipelineStageName} (${pipelineStage.title}) `,
        backgroundColor: colors[index % 6],
        width: unitWidth,
        height: 800,
        offsetX: index * unitWidth + 50,
        offsetY: 0,
      },
      className: 'light',
      type: 'resizeRotate',
      position: {
        x: index * unitWidth + 50 * index,
        y: 0,
      },
      // draggable: false,
    };

    return node;
  });

  return {
    layoutNodes,
  };
}
