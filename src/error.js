'use strict';

/**
 *
 */
export default class HughError extends Error {
  /**
   *
   * @param error
   */
  constructor(error) {
    super(error);
    this.name = this.constructor.name;
    if (typeof (error) === 'string') {
      this.message = error;
      this.type = 0;
    } else {
      this.message = error.message || error.description;
      this.type = error.type;
    }

    if (error.address) {
      this.address = error.address;
    }

    Error.captureStackTrace(this, this.constructor.name);
  }
}
