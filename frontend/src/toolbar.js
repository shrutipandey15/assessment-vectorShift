// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="bg-[#1a0f2e]/60 backdrop-blur-sm border-b border-purple-500/20 px-6 py-4">
            <div className="flex flex-wrap gap-3">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='note' label='Note' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};