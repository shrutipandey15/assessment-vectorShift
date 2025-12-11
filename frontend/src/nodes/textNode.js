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
        className: 'variable-handle',
        style: { 
          top: `${HANDLE_BASE_OFFSET + (index + 1) * HANDLE_SPACING}px`,
          background: '#06b6d4',
          width: '10px',
          height: '10px',
          border: '2px solid #ffffff',
          boxShadow: '0 0 8px rgba(6, 182, 212, 0.6)'
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
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Text:</label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30 transition-all resize-none min-h-[60px]"
          rows={1}
          placeholder="Enter text... Use {{variable}} for inputs"
        />
      </div>
    </BaseNode>
  );
}