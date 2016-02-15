/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const HueApi = require('../lib/index').HueApi;

chai.use(chaiAsPromised);

const hue = new HueApi(testValues.host, testValues.username);

describe('Hugh', () => {
  describe('config', () => {
    it('returns the bridge configuration', () => {
      function validateConfigResults(results) {
        expect(results).to.be.an.instanceOf(Object);
        expect(results).to.have.property('name');
        expect(results).to.have.property('ipaddress').to.equal(testValues.host);
      }

      return hue.getConfig()
        .then((results) => {
          validateConfigResults(results);
        });
    });
  });
});
