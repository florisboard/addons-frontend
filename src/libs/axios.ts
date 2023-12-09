import mainAxios from 'axios';
import config from '@/fixtures/config';

const axios = mainAxios.create({
  baseURL: config.backendUrl,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
