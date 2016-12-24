/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const HueApi = require('../lib/index').HueApi;
import checkResultsWereSuccessful from './common/utils';
const LightState = require('../lib/index').LightState;
const lightId = testValues.light.id;

chai.use(chaiAsPromised);

/* TODO: A light cannot have its hue, saturation, brightness, effect, ct or xy modified
  when it is turned off. Doing so will return 201 error.
  Check which states exclude other states, ie. don't send xy and sat/hue together?
  implement color conversion and helper methods
 */

describe('Hugh', () => {
  describe('setLightState', () => {
    let hue;
    let state;

    beforeEach(() => {
      state = new LightState();
      hue = new HueApi(testValues.host, testValues.username);
    });

    describe('turn light on', () => {
      it('returns a success message', () => {
        state.on();
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    describe('set multiple states', () => {
      it('returns a success message', () => {
        state.bri(255).hue(24000).sat(255).transitionTime(1).xy(0.4, 0.3);
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    // TODO: Check the increments / decrements using getLightStatus
    describe('set brightness increment', () => {
      beforeEach(() => {
        const initialState = new LightState().on().bri(50);
        return hue.setLightState(lightId, initialState).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });

      it('should increment by 1', () => {
        state.briInc(1);
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });

      it('should increment by 10', () => {
        state.briInc(10);
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });

      it('should increment by 50', () => {
        state.briInc(50);
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    describe('set invalid state', () => {
      it('should report error', () => {
        const checkError = function checkError(results) {
          expect(results.type).to.equal(7);
          expect(results.message).to.contain('invalid value');
          expect(results.message).to.contain('parameter, sat');
        };

        state.sat(500);
        state.hue(1000000);
        return hue.setLightState(lightId, state).then(() => {
          throw new Error('This should not be called');
        })
          .catch(checkError);
      });
    });

    describe('set a state using RGB values', () => {
      it('returns a success message', () => {
        state.rgb(255, 255, 0);
        return hue.setLightState(lightId, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });
  });
});
