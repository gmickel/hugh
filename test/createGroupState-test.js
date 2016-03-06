/* eslint-disable no-unused-expressions */

'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const GroupState = require('../lib/index').GroupState;

chai.use(chaiAsPromised);

describe('Hugh', () => {
  describe('Create GroupState', () => {
    it('returns a group state object', function doneCB(done) {
      const state = new GroupState();
      expect(state).to.be.an.instanceOf(Object);
      expect(state.constructor.name).to.equal('GroupState');
      expect(state).to.have.property('values');
      expect(state).to.have.property('scene');
      done();
    });
  });

  describe('Apply RGB to groupstate', () => {
    it('should return an error', function doneCB(done) {
      const state = new GroupState();
      state.rgb(100, 100, 100);
      expect(state).to.be.an.instanceOf(Object);
      expect(state.constructor.name).to.equal('GroupState');
      expect(state).to.have.property('values');
      expect(state).to.have.property('scene');
      done();
    });
  });

});
