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
          <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Field Name</span>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="w-full px-3 py-2 text-sm bg-black/30 border border-white/20 rounded-lg focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30 transition-all text-white placeholder-white/40"
          />
        </label>

        <label className="flex flex-col gap-1 relative" ref={dropdownRef}>
          <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Output Type</span>
          
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
              w-full px-3 py-2 text-sm border rounded-lg cursor-pointer flex items-center justify-between bg-black/30 transition-all
              ${isDropdownOpen ? 'border-purple-300 ring-2 ring-purple-400/30' : 'border-white/20 hover:border-purple-300/50'}
            `}
          >
            <span className="text-white">{outputType}</span>
            <ChevronDown 
              size={14} 
              className={`text-white/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-purple-800 border border-purple-400/30 rounded-lg shadow-xl z-50 overflow-hidden">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setOutputType(option.value);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors
                    ${outputType === option.value ? 'bg-purple-600 text-white font-medium' : 'text-white/80 hover:bg-purple-700 hover:text-white'}
                  `}
                >
                  <option.icon size={14} className={outputType === option.value ? 'text-white' : 'text-white/60'} />
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