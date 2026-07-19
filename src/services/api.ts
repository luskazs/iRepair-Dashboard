import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://trainee.fidelis.workers.dev/api',
  headers: {
    Authorization: 'Bearer c7da0182-8ed2-4a5d-91b8-1c561f4837fd'
  }
});