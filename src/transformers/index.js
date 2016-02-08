/* eslint no-param-reassign: 0 */

import * as utils from '../utils.js';
import HughError from '../error.js';

export function responseInterceptor(response) {
  let result = response.data;
  if (utils.wasSuccessful(response.data)) {
    // If we have no error, transform the response.data to true
    response.data = true;
  } else {
    // Transform the response object to only include the errors returned from the hue bridge
    //response.data = utils.parseErrors(response.data);
    let errors = utils.parseErrors(response.data);
    let join = errors.join(', ');
    throw new HughError(utils.parseErrors(response.data).join(', '));
  }

  return response;
}

// catch general axios errors
export function errorHandler(error) {
  return Promise.reject(error);
}
