/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseQuery } from '../utils';
import axios from 'axios';

export const stats = async (params?: any): Promise<BHServerData> => {
  const response = await axios.get(`/dashboard?${parseQuery(params)}`);
  return response.data;
}

export const auth = async (): Promise<{ user: unknown; token: string }> => {
  const params = {
    username: 'superuser',
    password: '1234',
    project: 1
  };
  const response = await axios.post('/auth/login', params);
  axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
  return response.data;
}