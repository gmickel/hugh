import { invoke } from '../http';

// TODO: don't use raw true here, transform response object if we don't want raw

class Lights {
  constructor() {

  }

  setLightState(config, id, state, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/lights/${id}/state`,
      data: state.values,
      raw: options.raw
    });
  }

  getAllLights(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/`,
      raw: options.raw
    });
  }

  getLightAttributesAndState(config, id, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/${id}`,
      raw: options.raw
    });
  }

}

export default new Lights();
