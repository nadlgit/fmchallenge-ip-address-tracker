/**
 * @jest-environment node
 */
import { handleOwnIp } from './handle-own-ip';
import { server, OWN_IP_MOCK_VALUE, errorHandler } from 'test-mocks/ipify-api';
import { isRealGeoAPIEnabled } from './is-real-geo-api-enabled';

jest.mock('./is-real-geo-api-enabled');

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('handleOwnIp()', () => {
  it('should not call isRealGeoAPIEnabled() when IP is provided', async () => {
    const testIp = '100.2.4.55';
    const resIp = await handleOwnIp(testIp);
    expect(isRealGeoAPIEnabled).not.toBeCalled();
  });

  it('should call isRealGeoAPIEnabled() when no IP provided', async () => {
    const resIp = await handleOwnIp();
    expect(isRealGeoAPIEnabled).toBeCalled();
  });

  it('should return same IP when IP is provided', async () => {
    const testIp = '100.2.4.55';
    expect(testIp).not.toBe(OWN_IP_MOCK_VALUE);
    const resIp = await handleOwnIp(testIp);
    expect(resIp).toBe(testIp);
  });

  it('should return empty string when no IP provided and isRealGeoAPIEnabled() returns false', async () => {
    isRealGeoAPIEnabled.mockImplementation(() => false);
    const resIp = await handleOwnIp();
    expect(resIp).toBe('');
  });

  it('should return API result when no IP provided and isRealGeoAPIEnabled() returns true and API response ok', async () => {
    isRealGeoAPIEnabled.mockImplementation(() => true);
    const resIp = await handleOwnIp();
    expect(resIp).toBe(OWN_IP_MOCK_VALUE);
  });

  it('should return empty string when no IP provided and isRealGeoAPIEnabled() returns true and API error', async () => {
    isRealGeoAPIEnabled.mockImplementation(() => true);
    server.use(errorHandler);
    const resIp = await handleOwnIp();
    expect(resIp).toBe('');
  });
});
