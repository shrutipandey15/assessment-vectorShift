import { Handle } from 'reactflow';
import { getNodeStyle } from './nodeStyles';

export const BaseNode = ({ label, children, handles = [], className = '' }) => {
  const style = getNodeStyle(label);

  return (
    <div className={`
      w-[200px] rounded-lg border-2 bg-white shadow-md 
      transition-all duration-200 hover:shadow-xl hover:ring-1 
      ${style.borderColor} ${style.shadow} ${className}
    `}>
      
      <div className={`flex items-center gap-2 rounded-t-md border-b px-3 py-2 ${style.headerBg} border-inherit`}>
        <span className={`${style.iconColor}`}>
          {style.icon}
        </span>
        <span className={`text-sm font-bold tracking-wide ${style.headerText} uppercase`}>{label}</span>
      </div>
      
      <div className="p-3 text-slate-600 font-sans text-sm">
        {children}
      </div>
      
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className={`
            !h-3 !w-3 rounded-full border-2 border-white 
            shadow-sm transition-all duration-200 
            hover:scale-125 hover:ring-2 hover:ring-offset-1 
            ${style.handleColor}
          `}
          style={{
            ...handle.style,
            [handle.position === 'left' ? 'left' : 'right']: '-6px', 
          }}
        />
      ))}
    </div>
  );
};