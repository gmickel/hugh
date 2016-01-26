'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const hugh = require('../lib/index');
const lightId = testValues.testLightId;

chai.use(chaiAsPromised);

/* TODO: A light cannot have its hue, saturation, brightness, effect, ct or xy modified
  when it is turned off. Doing so will return 201 error.
 */

describe('Hugh', () => {
  describe('setLightState', () => {
    let hue;
    let state;

    beforeEach(() => {
      state = hugh.lightState.create();
      hue = new hugh.HueApi(testValues.host, testValues.username);
    });

    describe('turn light on', () => {
      it('returns a success message', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.on();
        hue.setLightState(lightId, state).then((response) => {
          checkResults(response.data);
        });
      });
    });

    describe('set multiple states', () => {
      it('returns a success message', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.bri(255).hue(24000).sat(255).transitionTime(1);
        hue.setLightState(lightId, state).then((response) => {
          checkResults(response.data);
        });
      });
    });

    describe('set brightness increment', () => {
      beforeEach(function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        //let initialState = lightState.create().on().brightness(50);
        let initialState = hugh.lightState.create().on().bri(50);
        hue.setLightState(lightId, initialState).then((response) => {
          checkResults(response.data);
        });
      });

      it('should increment by 1', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.briInc(1);
        hue.setLightState(lightId, state).then((response) => {
          checkResults(response.data);
        });
      });

      it('should increment by 10', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.briInc(10);
        hue.setLightState(lightId, state).then((response) => {
          checkResults(response.data);
        });
      });

      it('should increment by 50', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        state.briInc(50);
        hue.setLightState(lightId, state).then((response) => {
          checkResults(response.data);
        });
      });
    });

    describe('set invalid state', () => {
      it('should report error', function doneCB(done) {
        const checkError = function(results) {
          expect(results[0].type).to.equal(7);
          expect(results[0].description).to.contain('invalid value');
          expect(results[0].description).to.contain('parameter, sat');
          expect(results[0].address).to.equal(`/lights/${lightId}/state/sat`);
          done();
        };

        state.sat(500);
        hue.setLightState(lightId, state).then((response) => {
          checkError(response.data);
        });
      });
    });
  });
});
