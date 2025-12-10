// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

const HANDLE_BASE_OFFSET = 30;
const HANDLE_SPACING = 20;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const variableRegex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
      
      const matches = [...currText.matchAll(variableRegex)].map(match => match[1]);
      const uniqueVars = [...new Set(matches)];

      const newHandles = uniqueVars.map((variable, index) => ({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: { 
          top: `${HANDLE_BASE_OFFSET + (index + 1) * HANDLE_SPACING}px`, 
          background: 'blue' 
        }
      }));

      newHandles.push({
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      });

      setHandles(newHandles);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currText, id]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      label="Text"
      handles={handles}
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