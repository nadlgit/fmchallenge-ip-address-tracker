import { composeResult } from './compose-result';
import { formatTimezone } from './format-timezone';

const SAMPLE_RESPONSE = Object.freeze({
  ip: '8.8.8.8',
  hostname: 'dns.google',
  continent_code: 'NA',
  continent_name: 'North America',
  country_code2: 'US',
  country_code3: 'USA',
  country_name: 'United States',
  country_capital: 'Washington, D.C.',
  state_prov: 'California',
  district: 'Santa Clara',
  city: 'Mountain View',
  zipcode: '94043-1351',
  latitude: '37.42240',
  longitude: '-122.08421',
  is_eu: false,
  calling_code: '+1',
  country_tld: '.us',
  languages: 'en-US,es-US,haw,fr',
  country_flag: 'https://ipgeolocation.io/static/flags/us_64.png',
  geoname_id: '6301403',
  isp: 'Google LLC',
  connection_type: '',
  organization: 'Google LLC',
  asn: 'AS15169',
  currency: Object.freeze({
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  }),
  time_zone: Object.freeze({
    name: 'America/Los_Angeles',
    offset: -8,
    current_time: '2020-12-17 07:49:45.872-0800',
    current_time_unix: 1608220185.872,
    is_dst: false,
    dst_savings: 1,
  }),
});

describe('composeResult()', () => {
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

  it('should return data object for full sample response', () => {
    const expected = {
      ip: SAMPLE_RESPONSE.ip,
      location: `${SAMPLE_RESPONSE.city}, ${SAMPLE_RESPONSE.state_prov} ${SAMPLE_RESPONSE.zipcode}`,
      timezone: formatTimezone(
        SAMPLE_RESPONSE.time_zone.offset,
        SAMPLE_RESPONSE.time_zone.is_dst,
        SAMPLE_RESPONSE.time_zone.dst_savings
      ),
      isp: SAMPLE_RESPONSE.isp,
      latitude: Number(SAMPLE_RESPONSE.latitude),
      longitude: Number(SAMPLE_RESPONSE.longitude),
    };
    expect(composeResult(SAMPLE_RESPONSE)).toEqual(expected);
  });

  it('should return location with country_name when state_prov is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.city}, ${SAMPLE_RESPONSE.country_name} ${SAMPLE_RESPONSE.zipcode}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.state_prov = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.state_prov;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });

  it('should return partial location when both state_prov and country_name are empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.city} ${SAMPLE_RESPONSE.zipcode}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.state_prov = '';
    testValue.country_name = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.state_prov;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.country_name;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    testValue.state_prov = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });

  it('should return partial location when city is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.state_prov} ${SAMPLE_RESPONSE.zipcode}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.city = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.city;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });

  it('should return partial location when zipcode is empty or missing', () => {
    const expectedLocation = `${SAMPLE_RESPONSE.city}, ${SAMPLE_RESPONSE.state_prov}`;
    const testValue = { ...SAMPLE_RESPONSE };
    testValue.zipcode = '';
    expect(composeResult(testValue).location).toEqual(expectedLocation);
    delete testValue.zipcode;
    expect(composeResult(testValue).location).toEqual(expectedLocation);
  });
});
