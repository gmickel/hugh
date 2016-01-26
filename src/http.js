import { errorHandler } from './transformers';
const axios = require('axios');

export function invoke(options) {
  const instance = axios.create({
    timeout: options.timeout || 1000
  });

  // TODO: better
  if (options.interceptor) {
    instance.interceptors.response.use(options.interceptor, errorHandler);
  }

  /*return instance.request({
    url: path,
    method,
    data
  });*/

  return instance.request(options);

  /*return instance.request(options)
    .then(response => {
      let result = response.data;

      if (!!options.raw) {
        return result;
      }

      if (result[0] !== undefined) {
        result = result[0];
      }

      /*if (result.error !== undefined) {
        throw new HuejayError({
          type:    result.error.type,
          message: result.error.description,
        });
      }*/

  /*


      // TODO: add simple true returning

      // Narrow down to success if available
      if (result.success !== undefined) {
        result = result.success;
      }

      return result;
    })
    .catch(error => {
      throw error;
    });*/
}
