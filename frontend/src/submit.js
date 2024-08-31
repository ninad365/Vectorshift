// submit.js
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nodes: nodes.length,
                edges: edges.length,
            }),
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
