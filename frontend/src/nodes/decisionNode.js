import React from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';
import { Text, Dropdown, Option } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const DecisionNode = ({ id, data }) => {
    const classes = useNodeStyles();
    const content = (
        <div className={classes.container}>
            <Text>This is a Decision Node.</Text>
            <Dropdown
                id={`${id}-type`}
            >
                <Option value="Text">Text</Option>
                <Option value="Image">Image</Option>
            </Dropdown>
        </div>
    );

    const inputHandles = [
        {
            id: `${id}-input`,
            position: Position.Left,
            type: 'target'
        },
    ];

    const outputHandles = [
        {
            id: `${id}-true`,
            position: Position.Right,
            type: 'source'
        },
        {
            id: `${id}-false`,
            position: Position.Right,
            type: 'source'
        }
    ];

    return (
        <BaseNode
            id={id}
            title="Decision Node"
            content={content}
            inputHandles={inputHandles}
            outputHandle={outputHandles} />
    );
};