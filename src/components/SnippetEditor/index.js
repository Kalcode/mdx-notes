import React, { useRef, useEffect, useState } from 'react';
import { EventEmitter } from 'golden-layout';
import debounce from 'lodash/debounce';

import { Controlled as CodeMirror } from 'react-codemirror2';

import initialSnippet from './initialSnippet';

import './index.css';
import { GoldenLayoutComponent } from '../GoldenLayoutComponent';


export default function SnippetEditor({ updateSnippet }) {
  const [ code, onChange ] = useState('');
  const [ editor, setEditor ] = useState(null);
  const divRef = useRef(null);

  useEffect(() => {
    onChange(initialSnippet);
    updateSnippet(initialSnippet, 'Demo');
  }, [updateSnippet]);

  useEffect(() => {
    let resizeEvent;
    let subscribed;
    const { goldenLayoutInstance } = GoldenLayoutComponent;

    if (editor && divRef && goldenLayoutInstance) {
      const { current } = divRef;

      resizeEvent = () => {
        console.log('resize');
        editor.setSize(current.offsetWidth, current.offsetHeight);
      };

      resizeEvent();
      goldenLayoutInstance.on('stateChanged', resizeEvent);
      window.addEventListener('resize', resizeEvent);
      
      subscribed = true;
    }

    return () => {
      if (subscribed) {
        window.removeEventListener('resize', resizeEvent);
        goldenLayoutInstance.unbind('stateChanged', resizeEvent);
      }
    };
  }, [editor, divRef]);

  const debounceOnChange = debounce(updateSnippet, 500);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', maxHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3>Test</h3>
        <label>
          Module Name
          <input type='text' value="Demo" />
        </label>
        <button
          type="button"
          onClick={() => updateSnippet(code, 'Demo')}
        >
          Save
        </button>
      </div>
      <div style={{ flex: '1 1 auto', minHeight: 0 }} ref={divRef}>
        <CodeMirror
          editorDidMount={(currentEditor) => {
            setEditor(currentEditor);
          }}
          onBeforeChange={(currentEditor, data, value) => {
            onChange(value);
          }}
          options={{
            mode: 'jsx',
            lineNumbers: true
          }}
          value={code}
        />
      </div>
    </div>
  );
}