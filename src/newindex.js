import _ from 'lodash';
import configAPI from './commands/configuration-api';
import lightsAPI from './commands/lights-api';
import groupsAPI from './commands/groups-api';
import scenesAPI from './commands/scenes-api';
import discoveryAPI from './commands/discovery-api';
import LightState from './lightstate';
import GroupState from './groupstate';
import HughError from './error';
import rgb from './rgb';

export default function HueApi(host, username, options = {}) {
  const config = {
    host,
    username,
    timeout: options.timeout || 10000,
    port: options.port || 80
  };

  /**
   * @param options
   * @returns {axios.Promise}
   */
  function lights(options = {raw: true}) {
    console.log('config', config);
    return lightsAPI.getAllLights(config, options);
  }

    /**
   * Allows the user to turn the light on and off, modify the hue and effects
   * @param id
   * @param state
   * @param options
   * @returns {*}
   */
  function setLightState(id, state, options = {raw: false}) {
    return lightsAPI.setLightState(config, id, state, options);
  }

  return {
    lights,
    setLightState
  };
}

export {LightState, GroupState};

