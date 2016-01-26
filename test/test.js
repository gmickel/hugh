const testValues = require('./common/testEnvValues');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const hugh = require('../lib/index');

chai.use(chaiAsPromised);

const hue = new hugh.HueApi(testValues.host, testValues.username);

describe('Hugh', () => {
  describe('config', () => {
    function validateConfigResults(results) {
      expect(results).to.be.an.instanceOf(Object);
      expect(results).to.have.property('name');
      expect(results).to.have.property('ipaddress').to.equal(testValues.host);
    }

    it('returns the bridge configuration', function doneCB(done) {
      hue.getConfig()
        .then((response) => {
          validateConfigResults(response.data);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  });
});
