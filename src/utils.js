const util = require('util');

export function wasSuccessful(results) {
  for (const result of results) {
    return result.success !== undefined;
  }
}

export function parseErrors(results) {
  const errors = [];

  if (util.isArray(results)) {
    for (const result of results) {
      if (result.error) {
        errors.push(result.error);
      }
    }
  } else {
    if (results.error) {
      errors.push(results.error);
    }
  }

  return errors;
}
