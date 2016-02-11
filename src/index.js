import configAPI from './commands/configuration-api';
import lightsAPI from './commands/lights-api';
import groupsAPI from './commands/groups-api';
import discoveryAPI from './commands/discovery-api';

class HueApi {
  constructor(host, username, timeout, port) {
    this.config = {
      host,
      username,
      timeout: timeout || 10000,
      port: port || 80
    };

    this.getLightStatus = this.lightStatus;
    this.getLights = this.lights;
  }

  /**
   *
   * @param id
   * @param state
   * @param options
 * @returns {*}
   */
  setLightState(id, state, options = { raw: false }) {
    return lightsAPI.setLightState(this.config, id, state, options);
  }

  setGroupState(id, state, options = { raw: false }) {
    return groupsAPI.setGroupState(this.config, id, state, options);
  }

  getConfig() {
    return configAPI.config(this.config);
  }

  lights(options = { raw: true }) {
    return lightsAPI.getAllLights(this.config, options);
  }

  lightStatus(id, options = { raw: true }) {
    return lightsAPI.getLightAttributesAndState(this.config, id, options);
  }

  newLights(options = { raw: true }) {
    return lightsAPI.getNewLights(this.config, options);
  }

}

module.exports = {
  HueApi,

  discoverBridges: function discoverBridges() {
    return discoveryAPI.discoverBridges();
  }
};
