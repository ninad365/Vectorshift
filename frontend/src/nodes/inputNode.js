import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input, Dropdown, Option, Label } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const InputNode = ({ id, data }) => {
  const classes = useNodeStyles();
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const [handles, setHandles] = useState([]);

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    updateHandles(newValue); // Update handles based on the new value
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
    const spacing = variableNames.length > 0 ? 100 / (variableNames.length + 1) : 0;
    
    // Create new handles based on the variable names
    const newHandles = variableNames.map((variableName, index) => ({
      id: `${id}-var-${variableName}`,
      position: Position.Left,
      type: 'target', // Assuming these are target handles
      style: { top: `${(1 + index) * spacing}%` } // Adjust position as needed
    }));
    
    setHandles(newHandles);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Input Node</div>
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
      {handles.map(handle => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
};
