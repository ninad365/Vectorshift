import { makeStyles, shorthands } from '@fluentui/react-components';

export const useNodeStyles = makeStyles({
  container: {
    height: 'auto',
    ...shorthands.border('1px', 'solid', '#ccc'),
    ...shorthands.padding('10px'),
    backgroundColor: '#f3f2f1',
    borderRadius: '4px',
    marginBottom: '10px',
    minWidth: '300px',
  },
  header: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '16px', // Increase font size for better prominence
    fontFamily: 'Arial, sans-serif', // Set a clear, readable font
    color: '#33A', // Darker color for better readability
    textAlign: 'center', // Center-align text for a more balanced look
    textTransform: 'uppercase', // Make the title uppercase for emphasis
    letterSpacing: '1px',
  },
  field: {
    display: 'flex',
    marginBottom: '10px',
    justifyContent: 'space-between',
    minWidth: '320px',
  },
});