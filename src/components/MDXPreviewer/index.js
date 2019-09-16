import React,  { useContext, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import MDX from "./MDX";

import ErrorBoundary from '../ErrorBoundary';
import { MdxContext } from '../Context/MdxContext';

const style: React.CSSProperties = {
  background: 'white',
  overflow: 'auto',
  height: '100%',
}

function updateState(mdx, setState) {
  setState(mdx);
}

const debouncedUpdate = debounce(updateState, 500);

export default function MDXPreviewer({ mdx, components, scope }) {
  const value = useContext(MdxContext);

  const [ state, setState ] = useState(value);

  useEffect(() => {
    debouncedUpdate(value, setState);
  }, [value])

  return (
    <div style={style}>
      <ErrorBoundary resetCheck={state}>
        <MDX components={components} scope={scope}>
          {state}
        </MDX>
      </ErrorBoundary>
    </div>
  )
}