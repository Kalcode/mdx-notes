import React, { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';

import { GoldenLayoutComponent } from '../GoldenLayoutComponent';

import './styles.css';


export default function MonacoEditor({ 
  children,
  initialValue,
  language = 'javascript',
  onChange,
  options = {},
  registerEditor,
 }) {
  const [ editor, setEditor ] = useState(null);
  const [ { width, height }, setEditorHW ] = useState({ width: 0, height: 0 });

  const divRef = useRef(null);

  useEffect(() => {
    if (editor) {
      const subscription = editor.onDidChangeModelContent(() => {
        onChange(editor.getValue());
      });

      return () => {
        subscription.dispose();
      };
    };

    return () => {};
  }, [editor, onChange]);

  useEffect(() => {
    let resizeEvent;
    let subscribed;
    
    const { goldenLayoutInstance } = GoldenLayoutComponent;

    if (divRef && goldenLayoutInstance) {
      const { current } = divRef;

      resizeEvent = () => {
        setEditorHW({
          height: current.offsetHeight,
          width: current.offsetWidth,
        });
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
  }, [divRef]);

  return (
    <div className="monaco-editor-wrapper">
      <div className="monaco-editor-header">
        {children}
      </div>
      <div className="monaco-editor-container" ref={divRef}>
        <Editor
          editorDidMount={(_, editorValue) => { 
            setEditor(editorValue);

            if (registerEditor) {
              registerEditor(editorValue);
            }
           }}
          height={height}
          language={language}
          options={{
            fixedOverflowWidgets: true,
            ...options,
          }}
          value={initialValue}
          width={width}
        />
      </div>
    </div>
  );
}