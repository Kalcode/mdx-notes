import React from 'react'
import {transform} from 'buble'
import mdx from '@mdx-js/mdx'
import {MDXProvider, mdx as createElement} from '@mdx-js/react'

export default ({
  scope = {},
  components = {},
  remarkPlugins = [],
  rehypePlugins = [],
  children,
  ...props
}) => {
  const fullScope = {
    mdx: createElement,
    MDXProvider,
    components,
    props,
    ...scope
  }

  let jsx;

  try {
    jsx = mdx
    .sync(children, {
      remarkPlugins,
      rehypePlugins,
      skipExport: true
    })
    .trim()
  } catch(error) {
    return error.message;
  }

  let code;

  try {
    const result = transform(jsx, {
      objectAssign: 'Object.assign'
    })   

    code = result.code;
  } catch(error) {
    return error.message;
  }

  const keys = Object.keys(fullScope)
  const values = Object.values(fullScope)
  
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(
      '_fn',
      'React',
      ...keys,
      `${code}
      return React.createElement(MDXProvider, { components },
        React.createElement(MDXContent, props)
      );`
    )

    return fn({}, React, ...values);
  } catch(error) {
    return error.message;
  }
}

{/* <div style={{ stes: s}}/> */}