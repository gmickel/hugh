import test from 'ava';
import HueAPI from '../src/index';

import testValues from './common/testEnvValues';
//import checkResultsWereSuccessful from './common/utils';

test('Get all lights', async t => {
  let hue = new HueAPI(testValues.host, testValues.username);
  const results = await hue.lights();
  t.truthy(results);
  t.is(Object.keys(results).length, testValues.lightsCount, 'returned wrong number of lights');
});

test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');
  t.is(await bar, 'bar');
});
