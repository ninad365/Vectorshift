import React, { useState } from 'react';
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

export const CustomNode = ({ id, data }) => {
  const [customField, setCustomField] = useState(data?.customField || '');

  const fields = [
    { name: 'customField', label: 'Custom Field', value: customField, onChange: (e) => setCustomField(e.target.value), type: 'input' },
  ];

  const inputHandles = [
    { id: `${id}-output`, position: Position.Right, type: 'source' },
  ];

  const outputHandles = [
    { id: `${id}-output`, position: Position.Left, type: 'target' },
  ];

  return (
    <BaseNode id={id} data={data} title="Custom Node" fields={fields} inputHandles={inputHandles} outputHandles={outputHandles} />
  );
};