import React, { useState } from 'react';

import { GoldenLayoutComponent } from './components/GoldenLayoutComponent';
import MDXPreviewer from './components/MDXPreviewer';
import { MdxContext } from './components/Context/MdxContext';
import MDXEditor from './components/MDXEditor';
import { fileManager } from './utils/fileManager';

import evalCode from './utils/evalCode';
import initialMDX from './components/MDXEditor/initialMDX';
import initialSnippet from './components/SnippetEditor/initialSnippet';
import { TranspiledComponents } from './components/Context/TranspiledComponents';
import SnippetEditor from './components/SnippetEditor';


// evalCode(initialSnippet, 'Demo');

const initialComponents = {
  h1: props => <h1 style={{ color: 'tomato' }} {...props} />,
  code: props => <code style={{ background: '#ddd' }} {...props} />,
};

// // Provide custom components for markdown elements
// const componentsProp = {
//   h1: props => <h1 style={{ color: 'tomato' }} {...props} />,
//   code: props => <code style={{ background: '#ddd' }} {...props} />,
//   ...fileManager['mdx-notes'],
// };

// Provide variables that might be referenced by JSX
const scopeProp = {};


function App() {
  const [mdx, updateMdx ] = useState(initialMDX);
  const [ components, setComponents ] = useState(initialComponents);
  
  const updateSnippet = (code, namespace) => {
    evalCode(code, namespace);

    setComponents({
      ...components,
      ...fileManager['mdx-notes']
    });
  };

  return (
    <div className="App">
      <MdxContext.Provider value={mdx}>
        <TranspiledComponents.Provider value={components}>
          <GoldenLayoutComponent // config from simple react example: https://golden-layout.com/examples/#qZXEyv
            htmlAttrs={{ style: { height: '100vh', width: '100%' } }}
            config={{
              content: [
                {
                  type: 'row',
                  content: [
                    {
                      type: 'column',
                      content: [
                        {
                          title: 'Snippet',
                          type: 'react-component',
                          component: 'SnippetEditor',
                          props: { updateSnippet: (value, namespace) => { updateSnippet(value, namespace); } }
                        },
                        {
                          title: 'MDX',
                          type: 'react-component',
                          component: 'MDXEditor',
                          props: { updateMdx: (value) => { updateMdx(value); } }
                        },
                      ]
                    },
                    {
                      title: 'Preview',
                      type: 'react-component',
                      component: 'MDXPreviewer',
                      props: {  scope: scopeProp  }
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
              myLayout.registerComponent('MDXPreviewer', MDXPreviewer);
              myLayout.registerComponent('MDXEditor', MDXEditor);
              myLayout.registerComponent('SnippetEditor', SnippetEditor);
            }}
          />
        </TranspiledComponents.Provider>
      </MdxContext.Provider>
    </div>
  );
}

export default App;