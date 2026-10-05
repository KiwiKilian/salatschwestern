import { defineConfig } from '@hey-api/openapi-ts';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  input: 'http://localhost:8080/api/docs-json',
  output: 'src/modules/api',
  enums: 'typescript',
});
