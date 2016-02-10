class LightState {
  constructor(values) {
    this.values = values || {};
  }

  addValues(values) {
    this.values = Object.assign(this.values, values);
  }

  on(value = true) {
    this.addValues({ on: value });
    return this;
  }

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
   * @param x
   * @param y
   */
  xy(x, y) {
    // TODO: validate input
    this.addValues({ xy: [x, y] });
    return this;
  }

  ct(value) {
    this.addValues({ ct: value });
    return this;
  }

  alert(value) {
    this.addValues({ alert: value });
    return this;
  }

  effect(value) {
    this.addValues({ effect: value });
    return this;
  }

  transitionTime(value) {
    this.addValues({ transitiontime: value });
    return this;
  }

  briInc(value) {
    // jscs:disable
    this.addValues({ bri_inc: value });
    // jscs:enable
    return this;
  }

  satInc(value) {
    // jscs:disable
    this.addValues({ sat_inc: value });
    // jscs:enable
    return this;
  }

  hueInc(value) {
    // jscs:disable
    this.addValues({ hue_inc: value });
    // jscs:enable
    return this;
  }

  ctInc(value) {
    // jscs:disable
    this.addValues({ ct_inc: value });
    // jscs:enable
    return this;
  }

  xyInc(value) {
    // jscs:disable
    this.addValues({ xy_inc: value });
    // jscs:enable
    return this;
  }

}

module.exports = LightState;
