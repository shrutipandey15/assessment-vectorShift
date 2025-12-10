// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { Loader2, CheckCircle2, AlertCircle, X, FileText, Share2, Layers } from 'lucide-react';

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
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    pipeline: JSON.stringify({ nodes, edges }),
                }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all
                    ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'}
                `}
            >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Share2 size={20} />}
                {isLoading ? 'Running...' : 'Submit Pipeline'}
            </button>

            {result && (
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
                                <span className="text-lg font-bold text-slate-800">{result.num_nodes}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                                        <Share2 size={18} />
                                    </div>
                                    <span className="text-slate-600 font-medium">Number of Edges</span>
                                </div>
                                <span className="text-lg font-bold text-slate-800">{result.num_edges}</span>
                            </div>

                            <div className={`
                                flex items-center justify-between p-3 rounded-lg border
                                ${result.is_dag ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}
                            `}>
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${result.is_dag ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {result.is_dag ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                                    </div>
                                    <span className={`font-medium ${result.is_dag ? 'text-emerald-800' : 'text-red-800'}`}>
                                        DAG Validity
                                    </span>
                                </div>
                                <span className={`font-bold ${result.is_dag ? 'text-emerald-700' : 'text-red-700'}`}>
                                    {result.is_dag ? 'Valid' : 'Invalid'}
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
            )}
        </div>
    );
}