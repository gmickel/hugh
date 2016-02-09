/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const HueApi = require('../lib/index').HueApi;
const LightState = require('../lib/lightstate');

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('setGroupState', () => {
    let hue;
    let state;

    beforeEach(() => {
      hue = new HueApi(testValues.host, testValues.username);
      state = new LightState();
    });

    describe('turn all lights off', () => {
      it('returns a success message', () => {
        const validateLightStateOnResults = function validateLightStateOnResults(results) {
          expect(results).to.be.true;
        };

        state.off();
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          validateLightStateOnResults(results);
        });
      });
    });

    describe('turn all lights on', () => {
      it('returns a success message', () => {
        const validateLightStateOnResults = function validateLightStateOnResults(results) {
          expect(results).to.be.true;
        };

        state.on();
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          validateLightStateOnResults(results);
        });
      });
    });

    describe('set multiple states', () => {
      it('returns a success message', () => {
        const validateLightStateOnResults = function validateLightStateOnResults(results) {
          expect(results).to.be.true;
        };

        state.bri(255).hue(65535).sat(255);
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          validateLightStateOnResults(results);
        });
      });
    });
  });
});
