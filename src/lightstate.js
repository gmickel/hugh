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

  effect(value) {
    this.addValues({ effect: value });
    return this;
  }

  briInc(value) {
    // jscs:disable
    this.addValues({ bri_inc: value });
    // jscs:enable
    return this;
  }

  transitionTime(value) {
    this.addValues({ transitiontime: value });
    return this;
  }
}

module.exports = LightState;
