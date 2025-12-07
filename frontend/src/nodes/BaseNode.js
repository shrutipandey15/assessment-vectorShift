import { Handle } from 'reactflow';

export const BaseNode = ({ label, children, handles = [], className = '' }) => {
  return (
    <div className={`w-[200px] border border-black bg-white rounded-md shadow-sm ${className}`}>
      <div className="px-3 py-2 border-b border-black font-semibold text-gray-700 bg-gray-50">
        <span>{label}</span>
      </div>
      
      <div className="p-3">
        {children}
      </div>
      
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className="w-2 h-2 bg-indigo-500"
          style={handle.style}
        />
      ))}
    </div>
  );
};