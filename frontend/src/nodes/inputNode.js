import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { Input, Dropdown, Option, Label } from '@fluentui/react-components';
import { BaseNode } from './baseNode';
import { useNodeStyles } from './nodeStyles';

export const InputNode = ({ id, data }) => {
  const classes = useNodeStyles();
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    updateHandles(currName); // Update handles whenever the name changes
  }, [currName]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
  };

  const handleTypeChange = (e, option) => {
    setInputType(option.value);
  };

  const updateHandles = (input) => {
    // Regex to find variables in the form of {{ variableName }}
    const variableRegex = /\{\{(\s*[a-zA-Z_][a-zA-Z0-9_]*\s*)\}\}/g;
    const matches = [...input.matchAll(variableRegex)];

    // Extract variable names
    const variableNames = matches.map(match => match[1].trim());

    // Create new handles based on the variable names
    const newHandles = variableNames.map((variableName) => ({
      id: `${id}-var-${variableName}`,
      position: Position.Left,
      type: 'target',
    }));

    setHandles(newHandles);
  };

  const inputHandles = handles;
  const outputHandle = {
    id: `${id}-value`,
    style: { top: '50%' } // Adjust position as needed
  };

  return (
    <BaseNode
      id={id}
      title="Input Node"
      content={
        <>
          <div className={classes.field}>
            <Label htmlFor={`${id}-name`}>Name:</Label>
            <Input
              id={`${id}-name`}
              value={currName}
              onChange={handleNameChange}
            />
          </div>
          <div className={classes.field}>
            <Label htmlFor={`${id}-type`}>Type:</Label>
            <Dropdown
              id={`${id}-type`}
              value={inputType}
              onOptionSelect={handleTypeChange}
            >
              <Option value="Text">Text</Option>
              <Option value="File">File</Option>
            </Dropdown>
          </div>
        </>
      }
      inputHandles={inputHandles}
      outputHandle={outputHandle}
    />
  );
};
