import { fetchLocation } from './fetch-location';
import 'whatwg-fetch';
import { server, testData, ERROR_API_KEY, ERROR_INVALID_IP } from 'test-mocks/ipgeolocation-api';
import { composeResult } from './compose-result';

beforeAll(() => {
  server.listen();
  process.env.IPGEOLOCATION_API_KEY = 'TEST_API_KEY';
});

afterEach(() => {
  server.resetHandlers();
  process.env.IPGEOLOCATION_API_KEY = 'TEST_API_KEY';
});

afterAll(() => {
  server.close();
});

describe('fetchLocation()', () => {
  it.each(testData)('should return data object for IP "$ip"', async (val) => {
    const result = await fetchLocation(val.ip);
    expect(result).toEqual({ httpCode: 200, payload: composeResult(val) });
  });

  it('should return error object when no API key is provided', async () => {
    process.env.IPGEOLOCATION_API_KEY = '';
    const result = await fetchLocation();
    expect(result).toEqual({
      httpCode: ERROR_API_KEY.code,
      payload: { errorMessage: ERROR_API_KEY.payload.message },
    });
  });

  // it('should return error object when invalid IP is provided', async () => {
  //   const result = await fetchLocation('abcdefgh');
  //   expect(result).toEqual({
  //     httpCode: ERROR_INVALID_IP.code,
  //     payload: { errorMessage: ERROR_INVALID_IP.payload.message },
  //   });
  // });
});
