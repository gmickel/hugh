import { errorHandler } from './transformers';
const axios = require('axios');

export function invoke(options) {
  const instance = axios.create({
    timeout: options.timeout || 1000,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  // TODO: better
  if (options.interceptor) {
    instance.interceptors.response.use(options.interceptor, errorHandler);
  }

  return instance.request(options);
}
