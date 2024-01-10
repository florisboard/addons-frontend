import axios from 'axios';
import config from '@/fixtures/config';
import { Api, HttpClient } from '@/generated';
import { defaultAxiosProperties } from './axios';

const client = new HttpClient();
const apiAxios = axios.create({ ...defaultAxiosProperties, baseURL: config.backendUrl + '/api' });

client.instance = apiAxios;

const api = new Api(client);

export default api;
