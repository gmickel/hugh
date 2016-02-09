import { invoke } from '../http';

class Config {
  constructor() {

  }

  config(options) {
    return invoke({
      method: 'get',
      url: `http://${options.host}/api/${options.username}/config`,
      raw: true
    });
  }

}

export default new Config();
