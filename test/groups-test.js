/* eslint-disable no-unused-expressions */

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised');
const HueApi = require('../lib/index').HueApi;
const checkResultsWereSuccessful = require('./common/utils.js');
const LightState = require('../lib/lightstate');
const groupId = testValues.group.id;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Groups', () => {
    let hue;
    let state;

    beforeEach(() => {
      hue = new HueApi(testValues.host, testValues.username);
      state = new LightState();
    });

    describe('get all groups', () => {
      it('returns an object containing all groups found on the hue bridge', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results[groupId].name).to.equal(testValues.group.name);
          expect(results[groupId].lights).to.deep.equal(testValues.group.lights);
        };

        return hue.groups().then((results) => {
          checkResults(results);
        });
      });
    });

    describe('create group', () => {
      it('returns the created group', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Array);
          expect(results[0]).to.have.property('success');
        };

        const group = {
          lights: ['1', '2'],
          name: 'testgroup',
          type: 'LightGroup'
        };
        return hue.createGroup(group, { raw: true })
          .then((results) => {
            checkResults(results);
            return results[0].success.id;
          })
          .then((createdGroupId) => { // eslint-disable-line arrow-body-style
            // Delete created group on the bridge
            return expect(hue.deleteGroup(createdGroupId)).to.eventually.equal(true);
          });
      });
    });

    describe('get group status', () => {
      it('returns an object containing name, light membership and last command for a group', () => {
        const checkResults = function checkResults(results) {
          expect(results).to.be.an.instanceOf(Object);
          expect(results.name).to.equal(testValues.group.name);
          expect(results.lights).to.deep.equal(testValues.group.lights);
        };

        return hue.groupStatus(groupId).then((results) => {
          checkResults(results);
        });
      });
    });

    describe('set groupAttributes', () => {
      it('returns a success message', () => {
        const data = {
          name: 'changeMe'
        };
        return hue.setGroupAttributes(groupId, data)
          .then((results) => {
            checkResultsWereSuccessful(results);
          })
          .then(() => { // eslint-disable-line arrow-body-style
            // Change the group name back
            return expect(hue.setGroupAttributes(
              groupId,
              { name: testValues.group.name }
            )).to.eventually.equal(true);
          });
      });
    });

    /* setGroupState tests */

    describe('turn all lights off', () => {
      it('returns a success message', () => {
        state.off();
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    describe('turn all lights on', () => {
      it('returns a success message', () => {
        state.on();
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    describe('set multiple states', () => {
      it('returns a success message', () => {
        state.bri(255).hue(65535).sat(255);
        return hue.setGroupState(testValues.light.id, state).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });
  });
});
