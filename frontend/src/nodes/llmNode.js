// llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const HANDLE_BASE_OFFSET = 30;
const HANDLE_SPACING = 20;

const getTopPosition = (index) => 
    `${HANDLE_BASE_OFFSET + (index + 1) * HANDLE_SPACING}px`;

export const LLMNode = ({ id, data }) => {
  const promptHandlePosition = getTopPosition(1);

  return (
    <BaseNode
      label="LLM"
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-system`,
          style: { top: getTopPosition(0) }
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-prompt`,
          style: { top: promptHandlePosition }
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-response`,
          style: { top: promptHandlePosition } 
        }
      ]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}