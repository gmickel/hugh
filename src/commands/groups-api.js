import { invoke } from '../http';

class Groups {
  constructor() {

  }

  setGroupState(config, id, state, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/groups/${id}/action`,
      data: state.values,
      raw: options.raw
    });
  }

  get(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/lights/`,
      raw: options.raw
    });
  }
}

export default new Groups();
