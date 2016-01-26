import { invoke } from '../http';

class Config {
  constructor() {

  }

  config(options) {
    return invoke({
      method: 'get',
      url: `http://${options.host}/api/${options.username}/config`
    });
  }

}

export default new Config();
