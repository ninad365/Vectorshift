// toolbar.js

import { DraggableNode } from './draggableNode';
import { makeStyles, shorthands } from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    padding: '10px',
    backgroundColor: '#f3f2f1',
    borderRadius: '8px',
    ...shorthands.border('1px', 'solid', '#ccc'),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  nodesContainer: {
    marginTop: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  nodeButton: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    ...shorthands.border('1px', 'solid', '#0078d4'),
    color: '#0078d4',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    ':hover': {
      backgroundColor: '#0078d4',
      color: '#ffffff',
    },
  },
});

export const PipelineToolbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.toolbar}>
      <div className={classes.nodesContainer}>
        <DraggableNode type='customInput' label='Input' className={classes.nodeButton} />
        <DraggableNode type='llm' label='LLM' className={classes.nodeButton} />
        <DraggableNode type='customOutput' label='Output' className={classes.nodeButton} />
        <DraggableNode type='text' label='Text' className={classes.nodeButton} />
        <DraggableNode type='custom' label='Custom' className={classes.nodeButton} />
      </div>
    </div>
  );
};
