import invoke from '../http';

// TODO: support old API

/**
 *
 */
class Scenes {

  /**
   * Gets a list of all scenes currently stored in the bridge.
   * Scenes are represented by a scene id, a name and a list of lights which are part of the scene.
   * The name resource can contain a "friendly name" or can contain a unique code.
   * @param config
   * @param options
   * @returns {axios.Promise}
   */
  getAllScenes(config, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/scenes/`,
      raw: options.raw
    });
  }

  /**
   * Creates the given scene with all lights in the provided lights resource.
   * For a given scene the current light settings of the given lights resources are stored.
   * If the scene id is recalled in the future, these light settings will be
   * reproduced on these lamps.
   * If an existing name is used then the settings for this scene will be overwritten
   * and the light states resaved
   * @param config
   * @param data
   * @param options
   * @returns {axios.Promise}
   */
  createScene(config, data, options) {
    return invoke({
      method: 'POST',
      url: `http://${config.host}/api/${config.username}/scenes/`,
      data,
      raw: options.raw
    });
  }

  // TODO: flesh out the following methods

  /*
  createBasicScene() {

  }
  */

  /*
   createAdvancedScene() {

   }
   */

  /**
   * modify the scene name or lights list
   * @param config
   * @param sceneId
   * @param data
   * @param options
   * @returns {axios.Promise}
   */
  modifyScene(config, sceneId, data, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/scenes/${sceneId}`,
      data,
      raw: options.raw
    });
  }

  // TODO: can't use all lightstate values here
  // TODO: use scene object
  modifySceneLightState(config, sceneId, lightId, data, options) {
    return invoke({
      method: 'PUT',
      url: `http://${config.host}/api/${config.username}/scenes/${sceneId}/lightstates/${lightId}`,
      data,
      raw: options.raw
    });
  }

  // TODO: Recall Scene, add alias method to use setGroupState
  /*
   To recall or activate a scene (synonyms for the same activity) use the
   activateScene() or recallScene() function.
  When a scense is being made active, it is possible to also filter the lights in the scene using a
  group definition to limit the lights that will be affected by the scene activation.
  This means you could have defined a scene for all your bulbs, but if you apply a
  group filter that includes only, say the lounge lights,
  then the scene will be activated only on the lounge lights.

   If a group filter is not specified (it is an optional parameter)
   then the API does no filtering on the lights in the scene when it is activated.
   */

  /**
   * Deletes a scene from the bridge
   * For Version 1 scenes (scenes created with PUT) or Version 2 scenes
   * (scenes created with POST wit the recycle flag set to true and locked to false)
   * when the maximum number of scenes
   * has been reached the scene which has been used the least is recycled
   * @param config
   * @param sceneId
   * @param options
   * @returns {axios.Promise}
   */
  deleteScene(config, sceneId, options) {
    return invoke({
      method: 'DELETE',
      url: `http://${config.host}/api/${config.username}/scenes/${sceneId}`,
      raw: options.raw
    });
  }

  /**
   * Gets the attributes of a given scene. See 4.1 Get all scenes for a
   * description of all attributes.
   * Please note that lightstates are displayed when an individual scene is retrieved
   * (but not for all scenes).
   * @param config
   * @param sceneId
   * @param options
   * @returns {axios.Promise}
   */
  getScene(config, sceneId, options) {
    return invoke({
      method: 'GET',
      url: `http://${config.host}/api/${config.username}/scenes/${sceneId}`,
      raw: options.raw
    });
  }
}

export default new Scenes();
