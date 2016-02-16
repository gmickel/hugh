import configAPI from './commands/configuration-api';
import lightsAPI from './commands/lights-api';
import groupsAPI from './commands/groups-api';
import scenesAPI from './commands/scenes-api';
import discoveryAPI from './commands/discovery-api';

class HueApi {
  constructor(host, username, timeout, port) {
    this.config = {
      host,
      username,
      timeout: timeout || 10000,
      port: port || 80
    };

    // TODO: Add aliases here named after the official API methods
    this.getLightAttributesAndState = this.lightStatus;
    this.getAllLights = this.lights;
    this.getNewLights = this.newLights;
    this.searchForNewLights = this.lightSearch;
    this.setLightAttributes = this.renameLight;
    this.getAllGroups = this.groups;
    this.getGroupAttributes = this.groupStatus;
    this.getConfiguration = this.getConfig;
    this.getFullState = this.getDatastore;
    this.activateScene = this.setGroupState;
    this.recallScene = this.setGroupState;
  }

  /**
   * Creates a new user. The link button on the bridge must be pressed
   * and this command executed within 30 seconds.
   * @param devicetype
   * @param options
   * @returns {*}
   */
  createUser(devicetype, options = { raw: true }) {
    return configAPI.createUser(this.config, devicetype, options);
  }

  /**
   * Returns list of all configuration elements in the bridge. Note all times are stored in UTC.
   * @param options
   * @returns {*}
   */
  getConfig(options = { raw: true }) {
    return configAPI.config(this.config, options);
  }

  /**
   * Allows the user to set some configuration values.
   * @param configurationParameters
   * @param options
   * @returns {*}
   */
  modifyConfig(configurationParameters, options = { raw: false }) {
    return configAPI.modifyConfig(this.config, configurationParameters, options);
  }

  /**
   * Deletes the specified user, <username>, from the whitelist
   * @param username
   * @param options
   * @returns {*}
   */
  deleteUser(username, options = { raw: false }) {
    return configAPI.deleteUser(this.config, username, options);
  }

  /**
   * This command is used to fetch the entire datastore from the device, including settings and
   * state information for lights, groups, schedules and configuration.
   * It should only be used sparingly as it is resource intensive for the bridge,
   * but is supplied e.g. for synchronization purposes.
   * @param options
   * @returns {axios.Promise}
   */
  getDatastore(options = { raw: true }) {
    return configAPI.getFullState(this.config, options);
  }

  lights(options = { raw: true }) {
    return lightsAPI.getAllLights(this.config, options);
  }

  newLights(options = { raw: true }) {
    return lightsAPI.getNewLights(this.config, options);
  }

  /**
   * Starts a search for new lights. As of 1.3 will also find switches (e.g. "tap")
   * @param deviceIds
   * @param options
   * @returns {*}
   */
  lightSearch(deviceIds = {}, options = { raw: false }) {
    return lightsAPI.searchForNewLights(this.config, deviceIds, options);
  }

  /**
   * Gets the attributes and state of a given light.
   * @param id
   * @param options
   * @returns {*}
   */
  lightStatus(id, options = { raw: true }) {
    return lightsAPI.getLightAttributesAndState(this.config, id, options);
  }

  /**
   * Used to rename lights. A light can have its name changed when in any state,
   * including when it is unreachable or off.
   * @param id
   * @param name
   * @param options
   * @returns {*}
   */
  renameLight(id, name, options = { raw: false }) {
    return lightsAPI.setLightAttributes(this.config, id, name, options);
  }

  /**
   * Allows the user to turn the light on and off, modify the hue and effects
   * @param id
   * @param state
   * @param options
   * @returns {*}
   */
  setLightState(id, state, options = { raw: false }) {
    return lightsAPI.setLightState(this.config, id, state, options);
  }

  /**
   * Deletes a light from the bridge
   * @param id
   * @param options
   * @returns {*}
   */
  deleteLight(id, options = { raw: false }) {
    return lightsAPI.deleteLights(this.config, id, options);
  }

  /* Groups */

  /**
   * Gets a list of all groups that have been added to the bridge.
   * A group is a list of lights that can be created, modified and deleted by a user.
   * The maximum numbers of groups is 16.
   * @param options
   * @returns {*}
   */
  groups(options = { raw: true }) {
    return groupsAPI.getAllGroups(this.config, options);
  }

  /**
   * Creates a new group containing the lights specified and optional name
   * @param data
   * @param options
   * @returns {*}
   */
  createGroup(data, options = { raw: false }) {
    return groupsAPI.createGroup(this.config, data, options);
  }

  /**
   * Gets the name, light membership and last command for a given group.
   * @param id
   * @param options
   * @returns {*}
   */
  groupStatus(id, options = { raw: true }) {
    return groupsAPI.getGroupAttributes(this.config, id, options);
  }

  /**
   * Allows the user to modify the name, light and class membership of a group.
   * @param id
   * @param groupAttributes
   * @param options
   * @returns {*}
   */
  setGroupAttributes(id, groupAttributes, options = { raw: false }) {
    return groupsAPI.setGroupAttributes(this.config, id, groupAttributes, options);
  }

  /**
   * Modifies the state of all lights in a group
   * @param id
   * @param state
   * @param options
   * @returns {*}
   */
  setGroupState(id, state, options = { raw: false }) {
    return groupsAPI.setGroupState(this.config, id, state, options);
  }

  /**
   * Deletes the specified group from the bridge.
   * @param id
   * @param options
   * @returns {*}
   */
  deleteGroup(id, options = { raw: false }) {
    return groupsAPI.deleteGroup(this.config, id, options);
  }

  getScenes(options = { raw: true }) {
    return scenesAPI.getAllScenes(this.config, options);
  }

  modifyScene(sceneId, modifiedData, options = { raw: false }) {
    return scenesAPI.modifyScene(this.config, sceneId, modifiedData, options);
  }

  deleteScene(sceneId, options = { raw: false }) {
    return scenesAPI.deleteScene(this.config, sceneId, options);
  }

  getScene(sceneId, options = { raw: true }) {
    return scenesAPI.getScene(this.config, sceneId, options);
  }

  // TODO: do create / modify scenes (with object)

}

module.exports = {
  HueApi,

  discoverBridges: function discoverBridges() {
    return discoveryAPI.discoverBridges();
  },

  version: require('../package.json').version
};
