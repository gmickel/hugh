import _ from 'lodash';
import rgb from './rgb';

/**
 *
 */
class LightState {
  /**
   *
   * @param values
   */
  constructor(values) {
    this.values = values || {};
  }

  /**
   *
   * @param values
   */
  addValues(values) {
    this.values = Object.assign(this.values, values);
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  on(value = true) {
    this.addValues({ on: value });
    return this;
  }

  /**
   *
   * @returns {LightState}
   */
  off() {
    this.on(false);
    return this;
  }

  /**
   * Adds the bri state
   * @param value The hue bri value, 0 to 255.
   * @return {LightState}
   */
  bri(value) {
    this.addValues({ bri: value });
    return this;
  }

  /**
   * Adds the hue for the desired colour.
   * @param value The hue value is a wrapping value between 0 and 65535.
   * Both 0 and 65535 are red, 25500 is green and 46920 is blue.
   * @return {LightState}
   */
  hue(value) {
    this.addValues({ hue: value });
    return this;
  }

  /**
   * The saturation of the color for the bulb, 0 being the least saturated i.e. white.
   * @param value The saturation value 0 to 255
   * @return {LightState}
   */
  sat(value) {
    this.addValues({ sat: value });
    return this;
  }

  /**
   *
   * @param args
   * @returns {LightState}
   */
  xy(...args) {
    const [x, y] = Array.isArray(args[0]) ? args[0] : args;
    this.addValues({ xy: [x, y] });
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  ct(value) {
    this.addValues({ ct: value });
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  alert(value) {
    this.addValues({ alert: value });
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  effect(value) {
    this.addValues({ effect: value });
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  transitionTime(value) {
    this.addValues({ transitiontime: value });
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  briInc(value) {
    // jscs:disable
    this.addValues({ bri_inc: value });
    // jscs:enable
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  satInc(value) {
    // jscs:disable
    this.addValues({ sat_inc: value });
    // jscs:enable
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  hueInc(value) {
    // jscs:disable
    this.addValues({ hue_inc: value });
    // jscs:enable
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  ctInc(value) {
    // jscs:disable
    this.addValues({ ct_inc: value });
    // jscs:enable
    return this;
  }

  /**
   *
   * @param value
   * @returns {LightState}
   */
  xyInc(value) {
    // jscs:disable
    this.addValues({ xy_inc: value });
    // jscs:enable
    return this;
  }

  rgb(...args) {
    const [r, g, b] = Array.isArray(args[0]) ? args[0] : args;
    this.addValues({ rgb: [r, g, b] });
    return this;
  }

  hasRGB() {
    return !!this.values.rgb;
  }

  convertRGB(modelId) {
    if (this.hasRGB()) {
      this.xy(rgb.convertRGBtoXY(this.values.rgb, modelId));
    }

    _.unset(this.values, 'rgb');
    return this;
  }

  copy() {
    const copy = new LightState();
    copy.addValues(this.values);
    return copy;
  }
}

module.exports = LightState;
