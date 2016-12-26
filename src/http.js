import axios from 'axios';
import request from 'superagent';
import HughError from './error';
import {errorHandler} from './transformers';
import { wasSuccessful, parseErrors } from './utils';

export function test(options) {
  return request(options.method, options.url);
}

/**
 *
 * @param options
 * @returns {axios.Promise}
 */
export default function invoke(options) {
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

      if (Boolean(options.raw) || options.interceptor) {
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
      .catch(err => {
        throw err;
      });
}
