/* eslint-disable no-unused-expressions */

// TODO: remove raw true and built a better response object

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const testValues = require('./common/testEnvValues');
const lightId = testValues.testLightId;
const HueApi = require('../lib/index').HueApi;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Lights', () => {
    let hue;

    beforeEach(() => {
      hue = new HueApi(testValues.host, testValues.username);
    });

    describe('get all lights', () => {
      it('returns a success message', function doneCB(done) {
        const checkResults = function checkResults(results) {
          // TODO: check number of lights
          expect(results).to.be.an.instanceOf(Object);
          done();
        };

        hue.getLights().then((results) => {
          checkResults(results);
        });
      });
    });

    describe('get light status', () => {
      it('returns the status of a light', function doneCB(done) {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results).to.have.property('name').to.equal(testValues.light.name);
          expect(results).to.have.property('type').to.equal(testValues.light.type);
          done();
        };

        hue.getLightStatus(lightId).then((results) => {
          checkResults(results);
        });
      });
    });
  });
});
