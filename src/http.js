import axios from 'axios';
import HughError from './error.js';
import errorHandler from './transformers';
import { wasSuccessful, parseErrors } from './utils.js';

/**
 *
 * @param options
 * @returns {axios.Promise}
 */
export function invoke(options) {
  const instance = axios.create({
    timeout: options.timeout || 1000,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  // TODO: use for transformation of lights object
  if (options.interceptor) {
    instance.interceptors.response.use(options.interceptor, errorHandler);
  }

  return instance
    .request(options)
    .then(response => {
      let result = response.data;

      if (!!options.raw || options.interceptor) {
        // TODO: check for errors here too
        const errors = parseErrors(result);
        if (errors.length === 0) {
          return result;
        }

        const error = {
          type: errors[0].type,
          message: errors[0].description
        };
        return Promise.reject(new HughError(error));
      }

      // Check for errors
      if (!wasSuccessful(result)) {
        const errors = parseErrors(result);
        const error = {
          type: errors[0].type,
          message: errors[0].description
        };
        return Promise.reject(new HughError(error));
      }

      if (result.success !== undefined) {
        result = true;
      }

      return true;
    })
      .catch(error => {
        throw error;
      });
}
