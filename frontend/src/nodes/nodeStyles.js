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
        borderColor: 'border-blue-400',
        headerBg: 'bg-blue-50',
        headerText: 'text-blue-900',
        iconColor: 'text-blue-500',
        handleColor: 'bg-blue-500',
        shadow: 'shadow-blue-100',
        icon: <ArrowRightCircle size={16} /> 
      };
    }
    if (lowerLabel.includes('output')) {
      return {
        borderColor: 'border-emerald-400',
        headerBg: 'bg-emerald-50',
        headerText: 'text-emerald-900',
        iconColor: 'text-emerald-500',
        handleColor: 'bg-emerald-500',
        shadow: 'shadow-emerald-100',
        icon: <MessageSquare size={16} />
      };
    }
    if (lowerLabel.includes('llm')) {
      return {
        borderColor: 'border-purple-400',
        headerBg: 'bg-purple-50',
        headerText: 'text-purple-900',
        iconColor: 'text-purple-500',
        handleColor: 'bg-purple-500',
        shadow: 'shadow-purple-100',
        icon: <Cpu size={16} />
      };
    }
    if (lowerLabel.includes('transform') || lowerLabel.includes('filter')) {
      return {
        borderColor: 'border-amber-400',
        headerBg: 'bg-amber-50',
        headerText: 'text-amber-900',
        iconColor: 'text-amber-500',
        handleColor: 'bg-amber-500',
        shadow: 'shadow-amber-100',
        icon: <Filter size={16} />
      };
    }
    if (lowerLabel.includes('text') || lowerLabel.includes('note')) {
        return {
          borderColor: 'border-stone-300',
          headerBg: 'bg-stone-100',
          headerText: 'text-stone-800',
          iconColor: 'text-stone-500',
          handleColor: 'bg-stone-400',
          shadow: 'shadow-stone-100',
          icon: <FileText size={16} />
        };
    }
    
     if (lowerLabel.includes('database')) {
      return {
        borderColor: 'border-stone-300',
        headerBg: 'bg-stone-100',
        headerText: 'text-stone-800',
        iconColor: 'text-stone-500',
        handleColor: 'bg-stone-400',
        shadow: 'shadow-stone-100',
        icon: <Database size={16} />
      };
    }
    return {
      borderColor: 'border-stone-300',
      headerBg: 'bg-stone-100',
      headerText: 'text-stone-800',
      iconColor: 'text-stone-500',
      handleColor: 'bg-stone-400',
      shadow: 'shadow-stone-100',
      icon: <Globe size={16} />
    };
  };