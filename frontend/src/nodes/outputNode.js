// outputNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { ChevronDown, Type, Image } from 'lucide-react';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleNameChange = (e) => setCurrName(e.target.value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'Text', icon: Type },
    { value: 'Image', icon: Image },
  ];

  return (
    <BaseNode
      label="Output"
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500">Field Name</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-700 placeholder-slate-400"
          />
        </label>

        <label className="flex flex-col gap-1 relative" ref={dropdownRef}>
          <span className="text-xs font-medium text-slate-500">Output Type</span>
          
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              w-full px-3 py-2 text-sm border rounded-lg cursor-pointer flex items-center justify-between bg-white transition-all
              ${isDropdownOpen ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200 hover:border-indigo-300'}
            `}
          >
            <span className="text-slate-700">{outputType}</span>
            <ChevronDown 
              size={14} 
              className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-white border border-slate-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-50 duration-100">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setOutputType(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors
                    ${outputType === option.value ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  <option.icon size={14} className={outputType === option.value ? 'text-indigo-500' : 'text-slate-400'} />
                  {option.value}
                </div>
              ))}
            </div>
          )}
        </label>
      </div>
    </BaseNode>
  );
}