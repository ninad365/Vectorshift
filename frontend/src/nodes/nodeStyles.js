import { makeStyles, shorthands } from '@fluentui/react-components';

export const useNodeStyles = makeStyles({
  container: {
    height: 'auto',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.padding('10px'),
    backgroundColor: '#f3f2f1',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  header: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  field: {
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'space-between',
    minWidth: '320px',
  },
});