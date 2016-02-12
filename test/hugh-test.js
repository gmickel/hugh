/* eslint-disable no-unused-expressions */

// TODO: Test interface and general error handling here

'use strict';

const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const Hugh = require('../lib/index');
const HueApi = Hugh.HueApi;
const HughError = require('../lib/error');

chai.use(chaiAsPromised);

describe('Hugh', () => {
  let hue;

  beforeEach(() => {
    hue = new HueApi(testValues.host, testValues.username);
  });

  describe('version property', () => {
    it('should be a string', () => {
      expect(Hugh).to.have.property('version');
      expect(Hugh.version).to.be.a('string');
    });
  });

  describe('discover bridges property', () => {
    it('should be a function', () => {
      expect(Hugh).to.have.property('discoverBridges');
      expect(Hugh.discoverBridges).to.be.a('function');
    });
  });

  describe('HueApi property', () => {
    it('should be a function', () => {
      expect(Hugh).to.have.property('HueApi');
      expect(Hugh.HueApi).to.be.a('function');
    });
  });

  describe('creating a new HueApi object', () => {
    it('should return a valid HueApi object', () => {
      expect(hue).to.be.an.instanceOf(Object);
      expect(hue.constructor.name).to.equal('HueApi');
      expect(hue.config.timeout).to.equal(10000);
    });
  });

  describe('creating a new HueApi object', () => {
    it('should return a valid HueApi object', () => {
      expect(hue).to.be.an.instanceOf(Object);
      expect(hue.constructor.name).to.equal('HueApi');
      expect(hue.config.timeout).to.equal(10000);
    });
  });

  describe('creating a new HughError', () => {
    const throwErrorString = function throwError() {
      throw new HughError('Error Test');
    };

    const throwError = function throwError() {
      throw new HughError({
        type: 1,
        message: 'Error Test'
      });
    };

    it('should be a valid HughError when passed a string', () => {
      try {
        throwErrorString();
      } catch (err) {
        expect(err).to.be.an.instanceOf(HughError);
        expect(err.message).to.equal('Error Test');
      }
    });

    it('should be a valid HughError when passed an error object', () => {
      try {
        throwError();
      } catch (err) {
        expect(err).to.be.an.instanceOf(HughError);
        expect(err.type).to.equal(1);
        expect(err.message).to.equal('Error Test');
      }
    });
  });
});
