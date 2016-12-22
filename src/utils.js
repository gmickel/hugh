const util = require('util');

/**
 *
 * @param results
 * @returns {boolean}
 */
export function wasSuccessful(results) {
  return results.every(result => {
    return result.success !== undefined;
  });
}

/**
 *
 * @param results
 * @returns {Array}
 */
export function parseErrors(results) {
  const errors = [];

  if (util.isArray(results)) {
    for (const result of results) {
      if (result.error) {
        errors.push(result.error);
      }
    }
  } else if (results.error) {
    errors.push(results.error);
  }

  return errors;
}
