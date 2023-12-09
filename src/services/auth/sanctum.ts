import axios from '@/libs/axios';

export default function sanctum() {
  return axios.get('/sanctum/csrf-cookie');
}
