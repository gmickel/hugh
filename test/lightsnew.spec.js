import test from 'ava';
import HueAPI, { LightState } from '../src/newindex';
import testValues from './common/testEnvValues';

test('Get all lights', async t => {
  let hue = new HueAPI(testValues.host, testValues.username);
  const results = await hue.lights();
  console.log(results.body);
  t.truthy(results);
  t.is(Object.keys(results.body).length, testValues.lightsCount, 'returned wrong number of lights');
});

test('Set a LightState - turn light off', async t => {
  let hue = new HueAPI(testValues.host, testValues.username);
  const state = new LightState();
  state.off();
  const results = await hue.setLightState(1, state);
  t.truthy(results);
});

test('Set a LightState - turn light on', async t => {
  let hue = new HueAPI(testValues.host, testValues.username);
  const state = new LightState();
  state.on();
  const results = await hue.setLightState(1, state, {raw: true});
  t.truthy(results);
});
