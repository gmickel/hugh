import { invoke } from '../http';

// TODO: don't use raw true here, transform response object if we don't want raw

class Lights {
  constructor() {

  }

  setLightState(options, id, state) {
    return invoke({
      method: 'PUT',
      url: `http://${options.host}/api/${options.username}/lights/${id}/state`,
      data: state.values
    });
  }

  getAllLights(options) {
    return invoke({
      method: 'GET',
      url: `http://${options.host}/api/${options.username}/lights/`,
      raw: true
    });
  }

  getLightAttributesAndState(options, id) {
    return invoke({
      method: 'GET',
      url: `http://${options.host}/api/${options.username}/lights/${id}`,
      raw: true
    });
  }

}

export default new Lights();
