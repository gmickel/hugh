import { invoke } from '../http';

class Discovery {
  constructor() {

  }

  discoverBridges() {
    return invoke({
      method: 'get',
      url: 'https://www.meethue.com/api/nupnp'
    });
  }

}

export default new Discovery();
