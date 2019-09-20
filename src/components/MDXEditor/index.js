import React, { useEffect, useContext, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import { MdxContext } from '../Context/MdxContext';
import { GoldenLayoutComponent } from '../GoldenLayoutComponent';

export default function MDXEditor({ updateMdx }) {
  const mdx = useContext(MdxContext);
  const [ editor, setEditor ] = useState(null);
  const divRef = useRef(null);

  useEffect(() => {
    let resizeEvent;
    let subscribed;
    const { goldenLayoutInstance } = GoldenLayoutComponent;

    if (editor && divRef && goldenLayoutInstance) {
      const { current } = divRef;

      resizeEvent = () => {
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
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', maxHeight: '100%' }}>
      <h3>Test</h3>
      <div style={{ flex: '1 1 auto', minHeight: 0 }} ref={divRef}>
        <CodeMirror
          editorDidMount={(currentEditor) => {
            setEditor(currentEditor);
          }}
          onBeforeChange={(currentEditor, data, value) => {
            updateMdx(value);
          }}
          options={{
            mode: 'markdown',
            lineNumbers: true
          }}
          value={mdx}
        />
      </div>
    </div>
  );
}
