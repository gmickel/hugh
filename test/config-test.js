/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const HueApi = require('../lib/index').HueApi;
const checkResultsWereSuccessful = require('./common/utils.js');

chai.use(chaiAsPromised);

const hue = new HueApi(testValues.host, testValues.username);

describe('Hugh', () => {
  describe('create user without pressing link button', () => {
    it('throw an error', () => {
      function validateError(error) {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.type).to.equal(101);
      }

      return hue.createUser({ devicetype: 'hugh#node' })
        .then(() => {
          throw new Error('This should not be called');
        })
        .catch(validateError);
    });
  });

  describe('create user after pressing link button', () => {
    it('returns the created user', () => {
      function validateCreatedUser(results) {
        expect(results).to.be.an.instanceOf(Array);
        expect(results[0]).to.have.property('success');
      }

      // Press Link Button
      return hue.modifyConfig({ linkbutton: true })
        .then((results) => {
          checkResultsWereSuccessful(results);
        })
        .then(() => { // eslint-disable-line arrow-body-style
          // Create User
          return hue.createUser({ devicetype: 'hugh#node' })
            .then((results) => {
              validateCreatedUser(results);
              return results[0].success.username;
            })
            .then((createdUser) => { // eslint-disable-line arrow-body-style
              // Delete created user
              return expect(hue.deleteUser(createdUser)).to.eventually.equal(true);
            });
        });
    });
  });

  describe('get configuration', () => {
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
