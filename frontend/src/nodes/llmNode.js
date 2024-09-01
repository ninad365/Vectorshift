// llmNode.js

import { Handle, Position } from 'reactflow';
import { Text } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const LLMNode = ({ id, data }) => {
  const classes = useNodeStyles();

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
