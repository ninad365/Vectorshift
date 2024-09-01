// llmNode.js

import React from 'react';
import { BaseNode } from './baseNode';
import { Text } from '@fluentui/react-components';
import { Position } from 'reactflow';

export const LLMNode = ({ id }) => {
  const content = (
    <div>
      <Text>This is a LLM.</Text>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="LLM"
      content={content}
      inputHandles={[
        {
          id: `${id}-system`,
          position: Position.Left,
          type: 'target'
        },
        {
          id: `${id}-prompt`,
          position: Position.Left,
          type: 'target'
        },
      ]}
      outputHandle={{
        id: `${id}-response`,
        position: Position.Right,
        type: 'source'
      }}
    />
  );
};
