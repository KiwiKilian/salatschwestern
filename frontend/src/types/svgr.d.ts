/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg?url' {
  const url: string;

  // eslint-disable-next-line import/no-default-export
  export default url;
}
