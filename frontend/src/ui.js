// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { 
  FilterNode, 
  TransformNode, 
  DatabaseNode, 
  NoteNode, 
  APINode 
} from './nodes/exampleNodes';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  database: DatabaseNode,
  note: NoteNode,
  api: APINode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <div ref={reactFlowWrapper} style={{width: '100%', height: '100%'}} className="bg-transparent">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                connectionLineStyle={{ 
                  stroke: 'rgba(139, 92, 246, 0.6)', 
                  strokeWidth: 2,
                  strokeDasharray: '5, 5'
                }} 
                defaultEdgeOptions={{
                    type: 'smoothstep', 
                    animated: true,
                    style: { 
                      stroke: 'rgba(139, 92, 246, 0.6)', 
                      strokeWidth: 2,
                      strokeDasharray: '5, 5'
                    }
                }}
            >
                <Background 
                    className="opacity-0"
                />
                <Controls 
                    className="!bg-[#1a0f2e]/90 backdrop-blur-lg border border-purple-500/30 shadow-lg shadow-purple-900/20 rounded-xl [&_button]:!text-white [&_button]:!bg-transparent [&_button]:!border-purple-500/20 [&_button:hover]:!bg-purple-500/20"
                    style={{ backgroundColor: 'rgba(26, 15, 46, 0.9)' }}
                />
                <MiniMap 
                    className="!bg-[#1a0f2e]/90 backdrop-blur-lg border border-purple-500/30 shadow-lg shadow-purple-900/20 rounded-lg"
                    nodeColor={(node) => {
                        if (node.type === 'customInput') return '#3b82f6';
                        if (node.type === 'customOutput') return '#10b981';
                        if (node.type === 'llm') return '#8b5cf6';
                        return '#8b5cf6';
                    }}
                    maskColor="rgba(139, 92, 246, 0.1)"
                    style={{ backgroundColor: 'rgba(26, 15, 46, 0.9)' }}
                />
            </ReactFlow>
        </div>
    )
}