import { invoke } from '../http';
import { lightsRGBBuilder } from '../transformers';

// TODO: don't use raw true here, transform response object if we don't want raw

class Lights {
  constructor() {

  }

  getAllLights(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/`,
      raw: options.raw
    });
  }

  getNewLights(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/new`,
      raw: options.raw
    });
  }

  searchForNewLights(config, deviceIds = {}, options) {
    return invoke({
      method: 'POST',
      url: `http://${config.host}/api/${config.username}/lights`,
      raw: options.raw,
      data: deviceIds
    });
  }

  getLightAttributesAndState(config, id, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/${id}`,
      raw: options.raw
    });
  }

  /**
   * Used to rename lights. A light can have its name changed when in any state
   * including when it is unreachable or off
   * @param config
   * @param id
   * @param data
   * @param options
   * @returns {*}
   */
  setLightAttributes(config, id, data, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/lights/${id}`,
      data,
      raw: options.raw
    });
  }

  /**
   * Allows the user to turn the light on and off, modify the hue and effects
   * @param config
   * @param id
   * @param state
   * @param options
   * @returns {*}
   */
  setLightState(config, id, state, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/lights/${id}/state`,
      data: state.values,
      raw: options.raw
    });
  }

  /**
   * Deletes a light from the bridge
   * @param config
   * @param id
   * @param options
   * @returns {*}
   */
  deleteLights(config, id, options) {
    return invoke({
      method: 'DELETE',
      url: `http://${config.host}/api/${config.username}/lights/${id}`,
      raw: options.raw
    });
  }

  /* Convenience methods */

  getAllLightsWithRGB(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/`,
      raw: options.raw,
      interceptor: lightsRGBBuilder
    });
  }

}

export default new Lights();
