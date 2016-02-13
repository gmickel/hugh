module.exports = {
  host: '192.168.0.3',
  username: '3f6881cd1cb85871be12289345131a3',
  lightsCount: 8,
  locateTimeout: 7000,
  maxScheduleNameLength: 32,
  hueLightId: 1,
  version: {
    api: '1.10.0',
    software: '01028090'
  },
  model: {
    name: 'Hugh',
    description: 'Philips hue Personal Wireless Lighting',
    number: '929000226503',
    serial: '001788096103',
    udn: 'uuid:2f402f80-da50-11e1-9b23-001788096103'
  },
  light: {
    id: 1,
    name: 'Office mid',
    type: 'Extended color light'
  },
  newlight: {
    id: 8,
    name: 'Bedroom'
  },
  group: {
    id: 1,
    name: 'Office',
    lights: ['3', '1', '2', '4'],
    type: 'LightGroup'
  }
};
