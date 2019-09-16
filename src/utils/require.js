import React from 'react';
import { fileManager } from './fileManager';

export default function require(moduleName = '') {
  const paths = moduleName.split('/');

  switch (paths[0]) {
    case 'react':
      return React;
    case 'mdx-notes':
      console.log(fileManager["mdx-notes"][paths[1]])
      return fileManager["mdx-notes"][paths[1]];
    default:
      throw new Error(`${moduleName} Module not found`);
  }
}