import React,  { useContext, useEffect, useState, useMemo } from 'react';
import debounce from 'lodash/debounce';

import MDX from './MDX';

import ErrorBoundary from '../ErrorBoundary';
import { MdxContext } from '../Context/MdxContext';
import { TranspiledComponents } from '../Context/TranspiledComponents';

const style: React.CSSProperties = {
  background: 'white',
  overflow: 'auto',
  height: '100%',
};

function updateState(mdx, setState) {
  setState(mdx);
}

const debouncedUpdate = debounce(updateState, 500);

export default function MDXPreviewer({ scope }) {
  const value = useContext(MdxContext);
  const components = useContext(TranspiledComponents);

  const [ state, setState ] = useState(value);

  const errorResetId = useMemo(() => {
    console.log('Calculating id');
    return state + components.length + Date.now();
  }, [state, components]);

  useEffect(() => {
    debouncedUpdate(value, setState);
  }, [value]);

  return (
    <div style={style}>
      <ErrorBoundary resetCheck={errorResetId}>
        <MDX components={components} scope={scope}>
          {state}
        </MDX>
      </ErrorBoundary>
    </div>
  );
}