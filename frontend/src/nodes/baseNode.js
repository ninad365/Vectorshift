import React from 'react';
import { Handle, Position } from 'reactflow';
import { Label, Input, Dropdown, Option } from '@fluentui/react-components';
import { useNodeStyles } from './nodeStyles';

export const BaseNode = ({ id, data, title, fields, inputHandles, outputHandles }) => {
  const classes = useNodeStyles();
  return (
    <div className={classes.container}>
      <div className={classes.header}>{title}</div>
      {fields.map((field, index) => (
        <div key={index} className={classes.field} >
          <Label htmlFor={`${id}-${field.name}`}>{field.label}:</Label>
          {field.type === 'input' ? (
            <Input
              id={`${id}-${field.name}`}
              value={field.value}
              onChange={field.onChange}
            />
          ) : (
            <Dropdown
              id={`${id}-${field.name}`}
              value={field.value}
              onOptionSelect={field.onChange}
            >
              {field.options.map((option) => (
                <Option key={option} value={option}>{option}</Option>
              ))}
            </Dropdown>
          )}
        </div>
      ))}

      {inputHandles && inputHandles.length > 0 && inputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      {outputHandles && outputHandles.length > 0 && outputHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};
