import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input, Dropdown, Option, Label } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const InputNode = ({ id, data }) => {
  const classes = useNodeStyles();
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e, option) => {
    setInputType(option.value);
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
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
};