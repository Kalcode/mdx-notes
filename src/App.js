import React, { useState } from "react";

import { GoldenLayoutComponent } from "./components/GoldenLayoutComponent";
import MDXPreviewer from "./components/MDXPreviewer";
import { MdxContext } from "./components/Context/MdxContext";
import MDXEditor from "./components/MDXEditor";
import { fileManager } from "./utils/fileManager";

import evalCode from "./utils/evalCode";

const testImports = `
import React from 'react';

export default function TestImport(props) {
  return (
    <div>
      <h4>Test Comp</h4>
    </div>
  )
};
`;

evalCode(testImports, 'TestImport');

const testComponentCode = `
import React, { useState } from 'react';
import TestComp from 'mdx-notes/TestImport';

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
`;

evalCode(testComponentCode, 'Demo');

// Provide custom components for markdown elements
const componentsProp = {
  h1: props => <h1 style={{ color: "tomato" }} {...props} />,
  code: props => <code style={{ background: '#ddd' }} {...props} />,
  ...fileManager["mdx-notes"],
};

// Provide variables that might be referenced by JSX
const scopeProp = {};

const mdx = `
# Hello MDX Note Taking Prototype
This is a test repo for mdx at runtime.

## 432k

## Component
<Demo color="#0A0"/>

\`\`\`
code code code code
\`\`\`

### Field Test
- <Field value={"Test"} onChange={() => {}}/>
- <Field value={"Test1"} onChange={() => {}}/>
- <Field value={"Test2"} onChange={() => {}}/>
- <Field value={"Test3"} onChange={() => {}}/>

###
<PlaceHoldImage size={300} title="Test Image Comp" />
`;

function App() {
  const [state, setState] = useState(mdx);

  return (
    <div className="App">
      <MdxContext.Provider value={state}>
        <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
          htmlAttrs={{ style: { height: "100vh", width: "100%" } }}
          config={{
            content: [
              {
                type: "row",
                content: [
                  {
                    title: "A react component",
                    type: "react-component",
                    component: "MDXEditor",
                    props: { updateMdx: (value) => { setState(value) } }
                  },
                  {
                    title: "Preview",
                    type: "react-component",
                    component: "MDXPreviewer",
                    props: { components: componentsProp, mdx, scope: scopeProp  }
                  }
                ]
              }
            ]
          }}
          registerComponents={myLayout => {
            myLayout.registerComponent("MDXPreviewer", MDXPreviewer);
            myLayout.registerComponent("MDXEditor", MDXEditor);
          }}
        />
      </MdxContext.Provider>
    </div>
  );
}

export default App;
