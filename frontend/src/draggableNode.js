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
        if (nodeType === 'customInput') return <ArrowRightCircle size={18} className="text-blue-400" />;
        if (nodeType === 'customOutput') return <MessageSquare size={18} className="text-emerald-400" />;
        if (nodeType === 'llm') return <Cpu size={18} className="text-purple-400" />;
        if (nodeType === 'text' || nodeType === 'note') return <FileText size={18} className="text-cyan-400" />;
        if (nodeType === 'database') return <Database size={18} className="text-amber-400" />;
        if (nodeType === 'transform' || nodeType === 'filter') return <Filter size={18} className="text-amber-400" />;
        return <Globe size={18} className="text-slate-400" />;
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
            h-[70px] min-w-[90px] 
            cursor-grab 
            bg-gradient-to-br from-purple-600 to-purple-700
            rounded-lg border border-purple-400/30
            shadow-lg shadow-purple-900/20
            transition-all duration-200
            hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1 hover:border-purple-300/50
            gap-2 p-3
          ">
            {getIcon(type)}
            <span className="text-xs font-semibold text-white">{label}</span>
          </div>
      </div>
    );
  };