import { invoke } from '../http';
import { responseInterceptor } from '../transformers';

class Groups {
  constructor() {

  }

  setGroupState(options, id, state) {
    return invoke({
      method: 'PUT',
      url: `http://${options.host}/api/${options.username}/groups/${id}/action`,
      data: state.values,
      interceptor: responseInterceptor
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
