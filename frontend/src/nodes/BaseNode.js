import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { getNodeStyle } from './nodeStyles';

const getHandlePositionStyle = (position) => {
  const offset = '-6px';
  switch (position) {
    case Position.Left: return { left: offset };
    case Position.Right: return { right: offset };
    case Position.Top: return { top: offset };
    case Position.Bottom: return { bottom: offset };
    default: return { right: offset };
  }
};

export const BaseNode = memo(({ label, children, handles = [], className = '' }) => {
  const style = getNodeStyle(label);

  return (
    <div className={`
      min-w-[200px] rounded-xl shadow-lg shadow-purple-900/20
      bg-gradient-to-br from-purple-600 to-purple-700
      border ${style.borderColor}
      transition-all duration-300 
      hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1
      ${className}
    `}>
      
      {/* Node Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="text-white/90">
          {style.icon}
        </span>
        <span className="text-sm font-bold tracking-wide text-white uppercase">
          {label}
        </span>
      </div>
      
      {/* Node Body */}
      <div className="p-4 text-white/80 font-sans text-sm">
        {children}
      </div>
      
      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={`
            !h-3 !w-3 rounded-full border-2 border-white 
            shadow-sm transition-all duration-200 
            hover:scale-125 hover:shadow-lg hover:shadow-blue-400/50
            ${style.handleColor}
          `}
          style={{
            ...handle.style,
            ...getHandlePositionStyle(handle.position)
          }}
        />
      ))}
    </div>
  );
});

BaseNode.displayName = 'BaseNode';