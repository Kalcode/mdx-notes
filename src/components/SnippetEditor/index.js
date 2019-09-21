import React, { useEffect, useState, useMemo } from 'react';

import initialSnippet from './initialSnippet';
import MonacoEditor from '../MonacoEditor';

export default function SnippetEditor({ updateSnippet }) {
  const [ code, onChange ] = useState(initialSnippet);
  const [ editor, setEditor ] = useState(null);

  const [ moduleName, setModuleName] = useState('Demo');

  useEffect(() => {
    onChange(initialSnippet);
    updateSnippet(initialSnippet, 'Demo');
  }, [updateSnippet]);

  return (
    <MonacoEditor
      initialValue={initialSnippet}
      language="javascript"
      onChange={onChange}
      registerEditor={setEditor}
    >
      <label>
        <strong>Module Name: </strong>&nbsp;
        <input type='text' onChange={({ target: { value }}) => setModuleName(value)} value={moduleName} />
      </label>
      <button
        type="button"
        onClick={() => {
          editor.getAction('editor.action.formatDocument').run();
          updateSnippet(code, moduleName);
        }}
      >
        Save
      </button>
    </MonacoEditor>
  );
}