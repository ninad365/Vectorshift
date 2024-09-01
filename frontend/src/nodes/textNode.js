// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Input, Label, makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '200px',
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

export const TextNode = ({ id, data }) => {
  const classes = useStyles();
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
