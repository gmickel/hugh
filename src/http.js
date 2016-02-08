import { errorHandler } from './transformers';
import util from 'util';
import axios from 'axios';
import HughError from './error.js';
import { wasSuccessful, parseErrors } from './utils.js';

export function invoke(options) {
  const instance = axios.create({
    timeout: options.timeout || 1000,
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'json'
  });

  // TODO: better
  /*if (options.interceptor) {
    instance.interceptors.response.use(options.interceptor, errorHandler);
  }*/

  return instance
    .request(options)
    .then(response => {
      let result = response.data;

      if (!!options.raw) {
        return result;
      }

      // Check for errors
      if (!wasSuccessful(result)) {
        const errors = parseErrors(result);
        let error = {
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


// check wasSuccessful first, then parse errors, otherwise do sucessful
      //const errors = parseErrors(result);
      //throw new HughError(errors.join(', '));

      /*if (util.isArray(result) && result.length > 1) {
        const results = {};
        //const errors = [];
        for (const res of result) {
          if (res.error !== undefined) {
            let error = {
              type: res.error.type,
              message: res.error.description
            };
            return Promise.reject(new HughError(error));

            //errors.push(result.error);
          }

          /*throw new HughError({
            type: res.error.type,
            message: res.error.description
          });*/


          /*res.success = true;
          Object.assign(results, res.success);*/
        /*}

        return true;
      }*/

      /*if (result[0] !== undefined) {
        result = result[0];
      }

      if (result.error !== undefined) {
        throw new HughError({
          type: result.error.type,
          message: result.error.description
        });
      }

      if (result.success !== undefined) {
        result = true;
      }

      return result;
    })*/
