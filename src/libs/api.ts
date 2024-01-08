import config from '@/fixtures/config';
import { Api, HttpClient } from '@/generated';
import axios from './axios';

const client = new HttpClient();

const apiAxios = axios;
apiAxios.defaults.baseURL = config.backendUrl + '/api';

client.instance = apiAxios;

const api = new Api(client);

export default api;
