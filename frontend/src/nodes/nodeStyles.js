import { 
  ArrowRightCircle, 
  MessageSquare, 
  Cpu, 
  FileText, 
  Database, 
  Filter, 
  Globe 
} from 'lucide-react';

export const getNodeStyle = (label) => {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('input')) {
      return {
        borderColor: 'border-l-4 border-l-blue-400 border-t border-r border-b border-purple-400/30',
        iconColor: 'text-blue-400',
        handleColor: 'bg-blue-500',
        icon: <ArrowRightCircle size={16} /> 
      };
    }
    if (lowerLabel.includes('output')) {
      return {
        borderColor: 'border-l-4 border-l-emerald-400 border-t border-r border-b border-purple-400/30',
        iconColor: 'text-emerald-400',
        handleColor: 'bg-emerald-500',
        icon: <MessageSquare size={16} />
      };
    }
    if (lowerLabel.includes('llm')) {
      return {
        borderColor: 'border-l-4 border-l-purple-400 border-t border-r border-b border-purple-400/30',
        iconColor: 'text-purple-300',
        handleColor: 'bg-purple-400',
        icon: <Cpu size={16} />
      };
    }
    if (lowerLabel.includes('transform') || lowerLabel.includes('filter')) {
      return {
        borderColor: 'border-l-4 border-l-amber-400 border-t border-r border-b border-purple-400/30',
        iconColor: 'text-amber-400',
        handleColor: 'bg-amber-500',
        icon: <Filter size={16} />
      };
    }
    if (lowerLabel.includes('text') || lowerLabel.includes('note')) {
        return {
          borderColor: 'border-l-4 border-l-cyan-400 border-t border-r border-b border-purple-400/30',
          iconColor: 'text-cyan-400',
          handleColor: 'bg-cyan-500',
          icon: <FileText size={16} />
        };
    }
    
     if (lowerLabel.includes('database')) {
      return {
        borderColor: 'border-l-4 border-l-amber-400 border-t border-r border-b border-purple-400/30',
        iconColor: 'text-amber-400',
        handleColor: 'bg-amber-500',
        icon: <Database size={16} />
      };
    }
    return {
      borderColor: 'border-l-4 border-l-slate-400 border-t border-r border-b border-purple-400/30',
      iconColor: 'text-slate-300',
      handleColor: 'bg-slate-400',
      icon: <Globe size={16} />
    };
  };