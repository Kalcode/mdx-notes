import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import initialSnippet from './initialSnippet';

export default function SnippetEditor({ updateSnippet }) {
  const [ value, onChange ] = useState('');

  useEffect(() => {
    onChange(initialSnippet);
    updateSnippet(initialSnippet, 'Demo');
  }, [updateSnippet]);

  const debounceOnChange = debounce(updateSnippet, 500);
  
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Test</h3>
        <label>
          Module Name
          <input type='text' value="Demo" />
        </label>
        <button onClick={() => updateSnippet(value, 'Demo')}>
          Save
        </button>
      </div>
      <textarea
        style={{ height: 500 , width: '100%' }}
        onChange={({ target }) => {
          onChange(target.value);
          // debounceOnChange(target.value, 'Demo');
        }}
        value={value}
      />
    </div>
  );
}