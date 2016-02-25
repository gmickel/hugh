import LightState from './lightstate';

/**
 *
 */
class GroupState extends LightState {
  /**
   *
   * @param values
   */
  constructor(values) {
    super(values);
  }

  /**
   * Recalls a scene
   * Note:  Use group <id> 0 to recall a scene for all lights (which are part of the scene),
   * or use another group <id> if you want to recall the scene for a specific group of lights.
   * E.g. Using group 2 would recall the scene for all lights that are in group 2 AND
   * are part of the specified scene.
   * @param sceneId
   * @returns {GroupState}
   */
  scene(sceneId) {
    this.addValues({ scene: sceneId });
    return this;
  }

}

module.exports = GroupState;
