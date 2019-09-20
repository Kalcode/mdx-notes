import * as Babel from '@babel/standalone';

import requireFunc from './require';
import { fileManager } from './fileManager';
import { ScopedLocalStorage } from './scopedLocalStorage/scopedLocalStorage';

export default function evalCode(code, moduleName) {
  const transformedCode = Babel.transform(code, {
    plugins: [],
    presets: ['es2015', 'react'],
  }).code;

  const exportsObject = {};

  // eslint-disable-next-line no-new-func
  const evalCodeFunc = new Function(
    'exports',
    'require',
    'localStorage',
    transformedCode,
  );

  try {
    evalCodeFunc(
      exportsObject,
      requireFunc,
      ScopedLocalStorage
    );
  } catch(error) {
    console.log(error);
    throw new Error(error);
  }

  const { default: defaultComp, ...rest } = exportsObject;

  if (defaultComp) {
    fileManager['mdx-notes'][moduleName] = defaultComp;
  }
  
  fileManager['mdx-notes'] = { ...fileManager['mdx-notes'], ...rest  };
}