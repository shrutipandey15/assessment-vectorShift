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
      <span className="text-white/70">Filters data stream.</span>
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
      <span className="text-white/70">Transforms input.</span>
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
      <span className="text-white/70">Executes query.</span>
    </div>
  </BaseNode>
);

export const NoteNode = ({ id }) => (
  <BaseNode label="Note" handles={[]}>
    <div>
      <label>
        <span className="text-xs font-medium text-white/70 uppercase tracking-wider block mb-1">Note:</span>
        <textarea 
          placeholder="Add notes..." 
          className="w-full h-16 px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30 transition-all resize-none"
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
      <span className="text-white/70">External API.</span>
    </div>
  </BaseNode>
);