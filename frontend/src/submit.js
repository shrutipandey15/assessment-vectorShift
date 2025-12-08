// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    pipeline: JSON.stringify({ nodes, edges }),
                }),
            });

            const data = await response.json();

            alert(
                `Pipeline Analysis:\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag}`
            );
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error submitting pipeline. Is the backend running?');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button 
                type="submit" 
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-medium shadow-sm"
            >
                Submit
            </button>
        </div>
    );
}