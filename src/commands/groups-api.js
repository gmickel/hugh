import { invoke } from '../http';

/**
 *
 */
class Groups {
  constructor() {

  }

  /**
   *
   * @param config
   * @param options
   * @returns {*}
   */
  getAllGroups(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/groups/`,
      raw: options.raw
    });
  }

  /**
   *
   * @param config
   * @param data
   * @param options
   * @returns {*}
   */

  // TODO: Group building method
  createGroup(config, data, options) {
    return invoke({
      method: 'POST',
      url: `http://${config.host}/api/${config.username}/groups`,
      data,
      raw: options.raw
    });
  }

  /**
   *
   * @param config
   * @param id
   * @param options
   * @returns {*}
   */
  getGroupAttributes(config, id, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/groups/${id}`,
      raw: options.raw
    });
  }

  /**
   *
   * @param config
   * @param id
   * @param data
   * @param options
   * @returns {*}
   */

  // TODO: Group building method
  setGroupAttributes(config, id, data, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/groups/${id}`,
      data,
      raw: options.raw
    });
  }

  /**
   *
   * @param config
   * @param id
   * @param state
   * @param options
   * @returns {*}
   */
  setGroupState(config, id, state, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/groups/${id}/action`,
      data: state.values,
      raw: options.raw
    });
  }

  // TODO: As of 1.4 it is not possible to delete a group of type "LightSource" or "Luminaire"
  // This will return a type 305 error.
  /**
   *
   * @param config
   * @param id
   * @param options
   * @returns {*}
   */
  deleteGroup(config, id, options) {
    return invoke({
      method: 'DELETE',
      url: `http://${config.host}/api/${config.username}/groups/${id}`,
      raw: options.raw
    });
  }
}

export default new Groups();
