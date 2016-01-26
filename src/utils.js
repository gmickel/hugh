const util = require('util');

export function wasSuccessful(results) {
  for (const result of results) {
    if (result.success === undefined) {
      return false;
    }

    return true;
  }
}

export function parseErrors(results) {
  let errors = [];

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

