'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const LightState = require('../lib/lightstate');

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Create LightState', () => {
    function validateConfigResults(results) {
      expect(results).to.be.an.instanceOf(Object);
      expect(results).to.have.property('name');
      expect(results).to.have.property('ipaddress').to.equal(testValues.host);
    }

    it('returns a light state object', function doneCB(done) {
      const state = new LightState();
      expect(state).to.be.an.instanceOf(Object);
      expect(state.constructor.name).to.equal('LightState');
      expect(state).to.have.property('values');
      done();
    });
  });
});
