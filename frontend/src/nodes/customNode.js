import React from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const CustomNode = ({ id, data }) => {
    const inputHandles = [
        {
            id: `${id}-output`,
            position: Position.Left,
            type: 'target'
        },
    ];

    const outputHandle = [
        {
            id: `${id}-output`,
            position: Position.Right,
            type: 'source'
        },
    ];

    return (
        <BaseNode id={id} data={data} title="Custom Node" inputHandles={inputHandles} outputHandle={outputHandle} />
    );
};