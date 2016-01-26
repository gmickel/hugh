'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const hugh = require('../lib/index');

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('setGroupState', () => {
    let hue;
    let state;

    beforeEach(() => {
      hue = new hugh.HueApi(testValues.host, testValues.username);
      state = hugh.lightState.create();
    });

    describe('turn all lights off', () => {
      it('returns a success message', function doneCB(done) {
        const validateLightStateOnResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.off();
        hue.setGroupState(1, state).then((response) => {
          validateLightStateOnResults(response.data);
        });
      });
    });

    describe('turn all lights on', () => {
      it('returns a success message', function doneCB(done) {
        const validateLightStateOnResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.on();
        hue.setGroupState(1, state).then((response) => {
          validateLightStateOnResults(response.data);
        });
      });
    });

    describe('set multiple states', () => {
      it('returns a success message', function doneCB(done) {
        const validateLightStateOnResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.bri(255).hue(65535).sat(255);
        hue.setGroupState(1, state).then((response) => {
          validateLightStateOnResults(response.data);
        });
      });
    });

  });
});
