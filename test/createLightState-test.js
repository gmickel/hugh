/* eslint-disable no-unused-expressions */

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

  describe('Create LightState with RGB', () => {
    it('returns a light state object', function doneCB(done) {
      const state = new LightState();
      state.rgb(100, 100, 100);
      expect(state).to.be.an.instanceOf(Object);
      expect(state.constructor.name).to.equal('LightState');
      expect(state).to.have.property('values');
      expect(state.values).to.have.property('rgb').to.be.an.instanceOf(Array);
      done();
    });
  });

});
