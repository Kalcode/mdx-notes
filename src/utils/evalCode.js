import * as Babel from "@babel/standalone";

import requireFunc from "./require";
import { fileManager } from "./fileManager";
import { ScopedLocalStorage } from "./scopedLocalStorage/scopedLocalStorage";

export default function evalCode(code, moduleName) {
  const transformedCode = Babel.transform(code, {
    plugins: [],
    presets: ["es2015", "react"],
  }).code;

  const exportsObject = {};

  // eslint-disable-next-line no-new-func
  const evalCode = new Function(
    "exports",
    "require",
    "localStorage",
    transformedCode,
  );

  evalCode(
    exportsObject,
    requireFunc,
    ScopedLocalStorage
  )

  console.log(exportsObject);

  fileManager["mdx-notes"][moduleName] = exportsObject.default;
  fileManager["mdx-notes"] = { ...exportsObject, ...fileManager["mdx-notes"]  };

  console.log(fileManager);
}