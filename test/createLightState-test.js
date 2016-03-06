/* eslint-disable no-unused-expressions */
const testValues = require('./common/testEnvValues');

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const LightState = require('../lib/index').LightState;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Create LightState', () => {
    it('returns a light state object', function doneCB(done) {
      const state = new LightState();
      expect(state).to.be.an.instanceOf(Object);
      expect(state.constructor.name).to.equal('LightState');
      expect(state).to.have.property('values');
      done();
    });
  });

  describe('Convert LightState RGB', () => {
    it('should convert RGB values to xy', function doneCB(done) {
      const state = new LightState();
      state.rgb(testValues.rgb);
      expect(state.values).to.have.property('rgb').to.be.an.instanceOf(Array);
      state.convertRGB(testValues.light.modelId);
      expect(state.values).to.not.have.property('rgb');
      expect(state.values).to.have.property('xy').to.be.an.instanceOf(Array);
      expect(state.values.xy).to.deep.equal(testValues.xy);
      done();
    });

    it('should not convert if no RGB values are set', function doneCB(done) {
      const state = new LightState();
      state.on();
      state.convertRGB(testValues.light.modelId);
      expect(state.values).to.not.have.property('rgb').to.be.an.instanceOf(Array);
      expect(state.values).to.not.have.property('xy').to.be.an.instanceOf(Array);
      done();
    });
  });
});
