import mainAxios, { CreateAxiosDefaults } from 'axios';
import config from '@/fixtures/config';

export const defaultAxiosProperties: CreateAxiosDefaults = {
  baseURL: config.backendUrl,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  withCredentials: true,
  withXSRFToken: true,
};

const axios = mainAxios.create(defaultAxiosProperties);

export default axios;
