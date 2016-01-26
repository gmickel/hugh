import { invoke } from '../http';
import { responseInterceptor } from '../transformers';

class Lights {
  constructor() {

  }

  setLightState(options, id, state) {
    return invoke({
      method: 'PUT',
      url: `http://${options.host}/api/${options.username}/lights/${id}/state`,
      data: state.values,
      interceptor: responseInterceptor
    });
  }

  getAllLights(options) {
    return invoke({
      method: 'GET',
      url: `http://${options.host}/api/${options.username}/lights/`
    });
  }

  getLightAttributesAndState(options, id) {
    return invoke({
      method: 'GET',
      url: `http://${options.host}/api/${options.username}/lights/${id}`
    });
  }

}

export default new Lights();
