/**
 * @jest-environment node
 */
import { handleOwnIp } from './handle-own-ip';
import { server, MOCK_OWN_IP, errorHandler } from 'test-mocks/ipify-api';

describe('handleOwnIp()', () => {
  beforeAll(() => {
    server.listen();
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = '';
  });

  afterEach(() => {
    server.resetHandlers();
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = '';
  });

  afterAll(() => {
    server.close();
  });

  it('should return same IP when provided', async () => {
    const testIp = '100.2.4.55';
    expect(testIp).not.toBe(MOCK_OWN_IP);
    const resIp = await handleOwnIp(testIp);
    expect(resIp).toBe(testIp);
  });

  it('should return empty string when no IP provided and API is not called', async () => {
    const resIp = await handleOwnIp();
    expect(resIp).toBe('');
  });

  it('should return API result when no IP provided and API is called', async () => {
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = 'true';
    const resIp = await handleOwnIp();
    expect(resIp).toBe(MOCK_OWN_IP);
  });

  it('should return empty when no IP provided and API is called and gets an error response', async () => {
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = 'true';
    server.use(errorHandler);
    const resIp = await handleOwnIp();
    expect(resIp).toBe('');
  });
});
