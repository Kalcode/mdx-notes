export default `
import React, { useState } from 'react';

export default function Test({ color, style }) {
  const [state, setState] = useState('Hello World!');

  return (
    <div style={style}>
      <h1>
        <TestComp />
        This is a demo component
        <span style={{ color: color }}> {state}</span>
      </h1>
      <Field onChange={({ target }) => setState(target.value)} value={state}/>
    </div>
  )
};

export function PlaceHoldImage({ size, title }) {
  return (
    <div>
      <p>{title || 'Place Holder Image'}</p>
      <img src={\`https://picsum.photos/\${size}\`} />  
    </div>
  )
}

export function Field({ onChange, value }) {
  return <input type="text" value={value} onChange={onChange}/>;
}

export function TestComp(props) {
  return (
    <div>
      <h4>Test Comp</h4>
    </div>
  )
};
`;