// draggableNode.js
import { 
  ArrowRightCircle, 
  MessageSquare, 
  Cpu, 
  FileText, 
  Database, 
  Filter, 
  Globe 
} from 'lucide-react';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const getIcon = (nodeType) => {
        if (nodeType === 'customInput') return <ArrowRightCircle size={20} className="text-blue-500" />;
        if (nodeType === 'customOutput') return <MessageSquare size={20} className="text-emerald-500" />;
        if (nodeType === 'llm') return <Cpu size={20} className="text-purple-500" />;
        if (nodeType === 'text' || nodeType === 'note') return <FileText size={20} className="text-stone-500" />;
        if (nodeType === 'database') return <Database size={20} className="text-stone-500" />;
        if (nodeType === 'transform' || nodeType === 'filter') return <Filter size={20} className="text-amber-500" />;
        return <Globe size={20} className="text-stone-500" />;
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
          <div className="
            flex flex-col items-center justify-center 
            h-[64px] min-w-[80px] 
            cursor-grab 
            bg-white rounded-lg border-2 border-stone-200 
            shadow-sm transition-all duration-200
            hover:shadow-md hover:border-indigo-400 hover:-translate-y-1
            gap-1 p-2
          ">
            {getIcon(type)}
            
            <span className="text-xs font-semibold text-stone-600">{label}</span>
          </div>
      </div>
    );
  };