import { invoke } from '../http';

class Groups {
  constructor() {

  }

  setGroupState(options, id, state) {
    return invoke({
      method: 'PUT',
      url: `http://${options.host}/api/${options.username}/groups/${id}/action`,
      data: state.values
    });
  }

  get(options) {
    return invoke({
      method: 'GET',
      url: `http://${options.host}/api/${options.username}/lights/`
    });
  }
}

export default new Groups();
