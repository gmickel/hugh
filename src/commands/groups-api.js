import { invoke } from '../http';

// TODO: handle group types
// TODO: handle room classes

/**
 *
 */
class Groups {
  constructor() {

  }

  /**
   * Gets a list of all groups that have been added to the bridge
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
   * Creates a new group containing the lights specified and optional name.
   * A new group is created in the bridge with the next available id
   * // TODO: Note: For bridges >= 1.11 for room creation the room class has to be passed,
   * without class it will get the default: "Other" class.
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
   * Gets the name, light membership and last command for a given group.
   * // TODO: As of 1.4 "type" is also returned. Also "modelid" is returned for Luminaire groups.
   * As of 1.9 "uniqueid" is also returned. This is explained in 2.1.4. - Notes
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
   * Allows the user to modify the name, light and class membership of a group.
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
   * Modifies the state of all lights in a group
   * // TODO: A light cannot have its hue, saturation, brightness, effect, ct or xy modified
   * when it is turned off. Doing so will return 201 error.
   * or as of 1.1 group resource can be used to recall a scene.
   * Note:  Use group <id> 0 to recall a scene for all lights (which are part of the scene),
   * or use another group <id> if you want to recall the scene for a specific group of lights.
   * E.g. Using group 2 would recall the scene for all lights that are in group 2 AND
   * are part of the specified scene.
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
   * Deletes the specified group from the bridge.
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
