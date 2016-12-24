/* eslint-disable no-unused-expressions */

// TODO: remove raw true and built a better response object

'use strict';

import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {HueApi} from '../lib/index';

import testValues from './common/testEnvValues';
import checkResultsWereSuccessful from './common/utils';

const lightId = testValues.light.id;

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

        return hue.getAllLights().then((results) => {
          checkResults(results);
        });
      });
    });

    describe('search for new lights', () => {
      it('returns true if the search was started', () => {  // eslint-disable-line arrow-body-style
        return hue.lightSearch()
          .then((results) => {
            checkResultsWereSuccessful(results);
          })
          .then(() => { // eslint-disable-line arrow-body-style
            return hue.newLights().then((results) => {
              expect(results).to.be.an.instanceOf(Object);
              expect(results.lastscan).to.equal('active');
            });
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

        return hue.getLightAttributesAndState(lightId).then((results) => {
          checkResults(results);
        });
      });
    });

    describe('get light status with rgb', () => {
      it('returns the status of a light including the converted rgb values', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results).to.have.property('name').to.equal(testValues.light.name);
          expect(results).to.have.property('type').to.equal(testValues.light.type);
          expect(results.state).to.have.property('rgb').to.be.an.instanceOf(Array);
        };

        return hue.getLightAttributesAndStateWithRGB(lightId).then((results) => {
          checkResults(results);
        });
      });
    });

    describe('get lights with rgb', () => {
      it('returns the status of all lights including the converted rgb values', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(Object.keys(results).length).to.equal(testValues.lightsCount);
          expect(results[lightId].name).to.equal(testValues.light.name);
          expect(results[lightId].state).to.have.property('rgb').to.be.an.instanceOf(Array);
        };

        return hue.getAllLightsWithRGB().then((results) => {
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
