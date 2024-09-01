import React from 'react';
import { Handle, Position } from 'reactflow';
import { useNodeStyles } from './nodeStyles';

export const BaseNode = ({ id, title, content, inputHandles, outputHandle }) => {
    const classes = useNodeStyles();
    return (
        <div className={classes.container}>
            <div className={classes.header}>{title}</div>

            {content && <div className={classes.content}>{content}</div>}

            {inputHandles && inputHandles.length > 0 && inputHandles.map((handle, index) => {
                const spacing = inputHandles.length > 0 ? 100 / (inputHandles.length + 1) : 0;
                const top = `${(1 + index) * spacing}%`;

                return (
                    <Handle
                        key={handle.id}
                        type="target"
                        position={handle.position}
                        id={handle.id}
                        style={{ top }} // Apply top as part of the style object
                    />
                );
            })}

            {outputHandle && <Handle
                key={outputHandle.id}
                type="source"
                position={Position.Right}
                id={outputHandle.id}
                style={outputHandle.style}
            />
            }
        </div>
    );
};
