// submit.js
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from './store';
import { Loader2, CheckCircle2, AlertCircle, X, FileText, Share2, Layers, Play } from 'lucide-react';

const API_ENDPOINT = 'http://127.0.0.1:8000/pipelines/parse';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    pipeline: JSON.stringify({ nodes, edges }),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to parse pipeline');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: ${error.message}. Is the backend running on ${API_ENDPOINT}?`);
        } finally {
            setIsLoading(false);
        }
    };

    const modalContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[400px] bg-white rounded-xl shadow-2xl border-2 border-indigo-100 p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Layers className="text-indigo-600" />
                        Pipeline Analysis
                    </h2>
                    <button 
                        onClick={() => setResult(null)}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                                <FileText size={18} />
                            </div>
                            <span className="text-slate-600 font-medium">Number of Nodes</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{result?.num_nodes}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                                <Share2 size={18} />
                            </div>
                            <span className="text-slate-600 font-medium">Number of Edges</span>
                        </div>
                        <span className="text-lg font-bold text-slate-800">{result?.num_edges}</span>
                    </div>

                    <div className={`
                        flex items-center justify-between p-3 rounded-lg border
                        ${result?.is_dag ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}
                    `}>
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${result?.is_dag ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                {result?.is_dag ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                            </div>
                            <span className={`font-medium ${result?.is_dag ? 'text-emerald-800' : 'text-red-800'}`}>
                                DAG Validity
                            </span>
                        </div>
                        <span className={`font-bold ${result?.is_dag ? 'text-emerald-700' : 'text-red-700'}`}>
                            {result?.is_dag ? 'Valid' : 'Invalid'}
                        </span>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                        onClick={() => setResult(null)}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center">
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-blue-500 to-blue-600
                    shadow-lg shadow-blue-500/40
                    transition-all duration-300
                    ${isLoading 
                        ? 'cursor-not-allowed opacity-70' 
                        : 'hover:scale-110 hover:shadow-xl hover:shadow-blue-500/60'
                    }
                `}
                title="Run Pipeline"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin text-white" size={24} />
                ) : (
                    <Play className="text-white ml-0.5" size={24} fill="white" />
                )}
            </button>

            {result && createPortal(modalContent, document.body)}
        </div>
    );
}