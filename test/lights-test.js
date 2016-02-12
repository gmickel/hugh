/* eslint-disable no-unused-expressions */

// TODO: remove raw true and built a better response object

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const testValues = require('./common/testEnvValues');
const checkResultsWereSuccessful = require('./common/utils.js');
const lightId = testValues.light.id;
const HueApi = require('../lib/index').HueApi;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Lights', () => {
    let hue;

    beforeEach(() => {
      hue = new HueApi(testValues.host, testValues.username);
    });

    describe('get all lights', () => {
      it('returns a success message', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(Object.keys(results).length).to.equal(testValues.lightsCount);
          expect(results[lightId].name).to.equal(testValues.light.name);
        };

        return hue.getLights().then((results) => {
          checkResults(results);
        });
      });
    });

    describe('get new lights', () => {
      it('returns an object containing any new lights found', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results[testValues.newlight.id].name).to.equal(testValues.newlight.name);
        };

        return hue.newLights().then((results) => {
          checkResults(results);
        });
      });
    });

    describe('get light status', () => {
      it('returns the status of a light', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results).to.have.property('name').to.equal(testValues.light.name);
          expect(results).to.have.property('type').to.equal(testValues.light.type);
        };

        return hue.getLightStatus(lightId).then((results) => {
          checkResults(results);
        });
      });
    });

    describe('set light attributes', () => {
      it('changes the name of a light', () => {
        const newName = 'New Name';
        return hue.renameLight(lightId, { name: newName }).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });

      it('changes the name of a light back with raw response', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Array);
          expect(results[0].success[`/lights/${lightId}/name`]).to.equal(testValues.light.name);
        };

        return hue.renameLight(
          lightId,
          { name: testValues.light.name },
          { raw: true }
        ).then((results) => {
          checkResults(results);
        });
      });
    });
  });
});
