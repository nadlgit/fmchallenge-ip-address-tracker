import { composeResult } from './compose-result';

const SAMPLE_RESPONSE = Object.freeze({
  ip: '8.8.8.8',
  location: Object.freeze({
    country: 'US',
    region: 'California',
    city: 'Mountain View',
    lat: 37.40599,
    lng: -122.078514,
    postalCode: '94043',
    timezone: '-07:00',
    geonameId: 5375481,
  }),
  domains: Object.freeze([
    '0d2.net',
    '003725.com',
    '0f6.b0094c.cn',
    '007515.com',
    '0guhi.jocose.cn',
  ]),
  as: Object.freeze({
    asn: 15169,
    name: 'Google LLC',
    route: '8.8.8.0/24',
    domain: 'https://about.google/intl/en/',
    type: 'Content',
  }),
  isp: 'Google LLC',
});

describe('composeResult()', () => {
  it('should return data object for full sample response', () => {
    const expected = {
      ip: SAMPLE_RESPONSE.ip,
      location: `${SAMPLE_RESPONSE.location.city}, ${SAMPLE_RESPONSE.location.region} ${SAMPLE_RESPONSE.location.postalCode}`,
      timezone: SAMPLE_RESPONSE.location.timezone,
      isp: SAMPLE_RESPONSE.isp,
      latitude: SAMPLE_RESPONSE.location.lat,
      longitude: SAMPLE_RESPONSE.location.lng,
    };
    expect(composeResult(SAMPLE_RESPONSE)).toEqual(expected);
  });

  it('should return default data object for empty response', () => {
    const expected = {
      ip: '',
      location: '',
      timezone: '',
      isp: '',
      latitude: 0,
      longitude: 0,
    };
    expect(composeResult({})).toEqual(expected);
  });

  it('should return partial location when city is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.location.region} ${SAMPLE_RESPONSE.location.postalCode}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.location = { ...SAMPLE_RESPONSE.location };
    testValue.location.city = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.location.city;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });

  it('should return partial location when region is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.location.city} ${SAMPLE_RESPONSE.location.postalCode}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.location = { ...SAMPLE_RESPONSE.location };
    testValue.location.region = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.location.region;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });

  it('should return partial location when postalCode is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.location.city}, ${SAMPLE_RESPONSE.location.region}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.location = { ...SAMPLE_RESPONSE.location };
    testValue.location.postalCode = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.location.postalCode;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });
});
