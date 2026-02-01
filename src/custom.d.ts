//declaring a module to deal with type Script
declare module '*.svg' {
  //import React from 'react';
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string; // because this file is in the "src" directory
  export default src;
}
