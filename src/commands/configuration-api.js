import { invoke } from '../http';

/**
 *
 */
class Config {
  constructor() {

  }

  /**
   *
   * @param options
   * @returns {*}
   */
  config(options) {
    return invoke({
      method: 'get',
      url: `http://${options.host}/api/${options.username}/config`,
      raw: true
    });
  }

}

export default new Config();
