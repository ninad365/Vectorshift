import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Button } from '@fluentui/react-components'; // v9 Button

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Button text="Standard" allowDisabledFocus disabled={false} checked={false} /> 
      <Button text="Primary" allowDisabledFocus disabled={true} checked={true} />
    </div>
  );
}

export default App;