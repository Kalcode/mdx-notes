import React, { useContext } from 'react';
import { MdxContext } from '../Context/MdxContext';

export default function MDXEditor({ updateMdx }) {
  const value = useContext(MdxContext);
  
  return (
    <div>
      <h3>Test</h3>
      <textarea
        style={{ height: 500 , width: '100%' }}
        onChange={({ target }) => {
          updateMdx(target.value)
        }}
        value={value}
      />
    </div>
  )
}