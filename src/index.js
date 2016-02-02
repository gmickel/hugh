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
  }

  setLightState(id, state) {
    return lightsAPI.setLightState(this.config, id, state);
  }

  setGroupState(id, state) {
    return groupsAPI.setGroupState(this.config, id, state);
  }

  getConfig() {
    return configAPI.config(this.config);
  }

  lights() {
    return lightsAPI.getAllLights(this.config);
  }

  getLights() {
    return this.lights();
  }

  lightStatus(id) {
    return lightsAPI.getLightAttributesAndState(this.config, id);
  }

  getLightStatus(id) {
    return this.lightStatus(id);
  }

}

module.exports = {
  HueApi,

  discoverBridges: function discoverBridges() {
    return discoveryAPI.discoverBridges();
  }
};
