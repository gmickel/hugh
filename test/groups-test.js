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
  describe('setGroupState', () => {
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
      it('returns a success message', () => {
        const group = {
          lights: ['1', '2'],
          name: 'testgroup',
          type: 'LightGroup'
        };
        return hue.createGroup(group).then((results) => {
          checkResultsWereSuccessful(results);
        });
      });
    });

    // TODO: find group with testgroup name and delete by id

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
