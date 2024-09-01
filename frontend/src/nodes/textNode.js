// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input, Label } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const TextNode = ({ id, data }) => {
  const classes = useNodeStyles();
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Text Node</div>
      <div className={classes.field}>
        <Label htmlFor={`${id}-text`}>Text:</Label>
        <Input
          id={`${id}-text`}
          value={currText}
          onChange={handleTextChange}
          multiline
          resize="vertical"
        />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
