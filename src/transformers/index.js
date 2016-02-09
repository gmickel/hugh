/* eslint no-param-reassign: 0 */

// TODO: not using this at the moment

import * as utils from '../utils.js';

export function responseInterceptor(response) {
  if (utils.wasSuccessful(response.data)) {
    // If we have no error, transform the response.data to true
    response.data = true;
  } else {
    // Transform the response object to only include the errors returned from the hue bridge
    response.data = utils.parseErrors(response.data);
  }

  return response;
}

// Add RGB conversion
export function lightsRGBBuilder(response) {
  return response;
}

// catch general axios errors
export function errorHandler(error) {
  return Promise.reject(error);
}
