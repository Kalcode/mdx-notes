import React, { useContext, useState } from 'react';

import { MdxContext } from '../Context/MdxContext';
import MonacoEditor from '../MonacoEditor';


export default function MDXEditor({ updateMdx }) {
  const mdx = useContext(MdxContext);
  const [ initialMdx ] = useState(mdx);
  
  return (
    <MonacoEditor
      initialValue={initialMdx}
      language="markdown"
      onChange={updateMdx}
    >
      <h3>Test</h3>
    </MonacoEditor>
  );
}
