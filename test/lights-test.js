'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const testValues = require('./common/testEnvValues');
const lightId = testValues.testLightId;
const hugh = require('../lib/index');

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Lights', () => {
    let hue;
    let state;

    beforeEach(() => {
      hue = new hugh.HueApi(testValues.host, testValues.username);
    });

    describe('get all lights', () => {
      it('returns a success message', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        hue.getLights().then((response) => {
          console.log(response.data);
          done();
        });
      });
    });

    describe('get light status', () => {
      it('returns a success message', function doneCB(done) {
        const checkResults = function(results) {
          expect(results).to.be.true; // eslint-disable-line no-unused-expressions
          done();
        };

        hue.lightStatus(15).then((response) => {
          console.log(response);
          done();
        });
      });
    });

  });
});
