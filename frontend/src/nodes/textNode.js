// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      label="Text"
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`
        }
      ]}
    >
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Text:</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="border rounded px-2 py-1 text-sm focus:outline-indigo-500 resize-none overflow-hidden min-h-[40px]"
          rows={1}
        />
      </div>
    </BaseNode>
  );
}