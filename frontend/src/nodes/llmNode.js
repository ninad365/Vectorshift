// llmNode.js

import { Handle, Position } from 'reactflow';
import { makeStyles, shorthands, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '200px',
    height: '80px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.padding('10px'),
    backgroundColor: '#f3f2f1',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  content: {
    fontSize: '12px',
  },
});

export const LLMNode = ({ id, data }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{top: `${100 / 3}%`}}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{top: `${200 / 3}%`}}
      />
      <div className={classes.header}>
        <Text>LLM</Text>
      </div>
      <div className={classes.content}>
        <Text>This is a LLM.</Text>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
};
