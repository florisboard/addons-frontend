import path from 'path';
import { generateApi } from 'swagger-typescript-api';

generateApi({
  name: 'generated.ts',
  output: path.resolve(process.cwd(), './src'),
  url: 'http://localhost/docs/api.json',
  toJS: false,
  httpClientType: 'axios',
  cleanOutput: false,
  sortTypes: true,
  sortRoutes: true,
  extractRequestBody: true,
  extractRequestParams: true,
  singleHttpClient: true,
});
