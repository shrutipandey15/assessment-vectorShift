import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => (
  <BaseNode
    label="Filter"
    handles={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-in`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-out`
      }
    ]}
  >
    <div>
      <span>Filters data stream.</span>
    </div>
  </BaseNode>
);

export const TransformNode = ({ id }) => (
  <BaseNode
    label="Transform"
    handles={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-in`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-out`
      }
    ]}
  >
    <div>
      <span>Transforms input.</span>
    </div>
  </BaseNode>
);

export const DatabaseNode = ({ id }) => (
  <BaseNode
    label="Database"
    handles={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-query`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-result`
      }
    ]}
  >
    <div>
      <span>Executes query.</span>
    </div>
  </BaseNode>
);

export const NoteNode = ({ id }) => (
  <BaseNode label="Note" handles={[]}>
    <div>
      <label>
        Note:
        <textarea 
          placeholder="Add notes..." 
          className="w-full h-16 border rounded p-1"
        />
      </label>
    </div>
  </BaseNode>
);

export const APINode = ({ id }) => (
  <BaseNode
    label="API Call"
    handles={[
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-req`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-res`
      }
    ]}
  >
    <div>
      <span>External API.</span>
    </div>
  </BaseNode>
);