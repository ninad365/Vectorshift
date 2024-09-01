// submit.js
import React, { useState } from 'react';
import { useStore } from './store';
import { Button } from '@fluentui/react-components';
import { Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions } from '@fluentui/react-components';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nodes: nodes,
                edges: edges,
            }),
        });

        const result = await response.json();
        console.log(result);

        // Prepare content to display in the dialog
        let content = `Parsed ${result.num_nodes} nodes and ${result.num_edges} edges.`;
        if (result.is_dag){
            content += " Pipeline forms a valid DAG.";
        } else {
            content += " Pipeline does not form a DAG (contains cycles).";
        }

        setDialogContent(content);

        // Open the dialog
        setIsDialogOpen(true);
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button onClick={handleSubmit}>Submit</Button>
            <Dialog open={isDialogOpen} onOpenChange={(event, data) => setIsDialogOpen(data.open)}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Pipeline Parse Result</DialogTitle>
                        <DialogContent>
                            <p>{dialogContent}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button appearance="primary" onClick={() => setIsDialogOpen(false)}>Close</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </div>
    );
}
