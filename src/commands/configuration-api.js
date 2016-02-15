import { invoke } from '../http';

/**
 *
 */
class Config {
  constructor() {

  }

  /**
   * Creates a new user. The link button on the bridge must be pressed and this command executed within 30 seconds.
   * @param config
   * @param data
   * @param options
   * @returns {axios.Promise}
   */
  createUser(config, data, options) {
    return invoke({
      method: 'POST',
      url: `http://${config.host}/api`,
      data,
      raw: options.raw
    });
  }

  /**
   * Returns list of all configuration elements in the bridge. Note all times are stored in UTC.
   * @param options
   * @returns {*}
   */
  config(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/config`,
      raw: options.raw
    });
  }

  /**
   * Allows the user to set some configuration values.
   * @param config
   * @param data
   * @param options
   * @returns {axios.Promise}
   */
  modifyConfig(config, data, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/config`,
      data,
      raw: options.raw
    });
  }

  deleteUser(config, username, options) {
    return invoke({
      method: 'DELETE',
      url: `http://${config.host}/api/${config.username}/config/whitelist/${username}`,
      raw: options.raw
    });
  }

  /**
   * This command is used to fetch the entire datastore from the device, including settings and state
   * information for lights, groups, schedules and configuration. It should only be used sparingly
   * as it is resource intensive for the bridge, but is supplied e.g. for synchronization purposes.
   * @param config
   * @param options
   * @returns {axios.Promise}
   */
  getFullState(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}`,
      raw: options.raw
    });
  }

}

export default new Config();
