import React, { useRef, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { makeMoveable, DraggableProps, ResizableProps, Draggable, Resizable } from 'react-moveable';

const Moveable = makeMoveable<DraggableProps & ResizableProps>([Draggable, Resizable]);

export default function ResizeRotateNode({
  id,
  data,
  selected,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
}: NodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const style = useMemo(
    () => ({
      background: data.backgroundColor,
      borderRadius: 2,
      padding: 10,
      width: data.width,
      height: data.height,
    }),
    [data.backgroundColor, data.height, data.width],
  );

  const onResize = ({ drag, width, height }: { drag: any; width: number; height: number }) => {
    if (!nodeRef.current) {
      return;
    }

    nodeRef.current.style.width = `${width}px`;
    nodeRef.current.style.height = `${height}px`;
    nodeRef.current.style.transform = drag.transform;
    console.log('drag.transform: ', drag.transform);
  };

  return (
    <>
      <Moveable className="nodrag" resizable={selected} target={nodeRef} onResize={onResize} hideDefaultLines />
      <div ref={nodeRef} style={style}>
        <span>{data.label}</span>
        <Handle style={{ opacity: 0 }} position={sourcePosition} type="source" />
        <Handle style={{ opacity: 0 }} position={targetPosition} type="target" />
      </div>
    </>
  );
}
