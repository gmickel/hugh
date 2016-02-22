/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const HueApi = require('../lib/index').HueApi;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Scenes', () => {
    let hue;

    beforeEach(() => {
      hue = new HueApi(testValues.host, testValues.username);
    });

    describe('get all scenes', () => {
      it('returns an object containing all scenes found on the hue bridge', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results[testValues.scene.id].name).to.equal(testValues.scene.name);
          expect(results[testValues.scene.id].lights).to.deep.equal(testValues.scene.lights);
        };

        return hue.scenes().then((results) => {
          checkResults(results);
        });
      });
    });
  });
});
