/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;

chai.use(chaiAsPromised);

const hue = require('../lib/index');

describe('Hugh', () => {
  describe('discovery', () => {
    it('returns the discovered Bridges', () => {
      const validateDiscoveryResults = function validateDiscoveryResults(results) {
        expect(results).to.be.an.instanceOf(Array);
        expect(results).to.have.length.at.least(1);
        expect(results[0]).to.have.property('internalipaddress').to.equal(testValues.host);
      };

      return hue.discoverBridges()
        .then((results) => {
          validateDiscoveryResults(results);
        });
    });
  });
});
