import invoke from '../http';

/**
 *
 */
class Discovery {

  /**
   *
   * @returns {*}
   */
  discoverBridges() {
    return invoke({
      method: 'get',
      url: 'https://www.meethue.com/api/nupnp',
      raw: true
    });
  }

}

export default new Discovery();
