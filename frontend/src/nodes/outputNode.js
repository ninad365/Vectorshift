// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input, Dropdown, Option, Label, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    height: 'auto',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.padding('10px'),
    backgroundColor: '#f3f2f1',
    borderRadius: '4px',
  },
  header: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  field: {
    marginBottom: '10px',
  },
});

export const OutputNode = ({ id, data }) => {
  const classes = useStyles();
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e, option) => {
    setOutputType(option.value);
  };

  return (
    <div className={classes.container}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
      <div className={classes.header}>Output Node</div>
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
          value={outputType}
          onOptionSelect={handleTypeChange}
        >
          <Option value="Text">Text</Option>
          <Option value="Image">Image</Option>
        </Dropdown>
      </div>
    </div>
  );
};