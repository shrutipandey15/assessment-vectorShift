// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode 
      label="Input" 
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` }
      ]}
    >
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Name:</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="border rounded px-2 py-1 focus:outline-indigo-500"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Type:</span>
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            className="border rounded px-2 py-1 focus:outline-indigo-500"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}