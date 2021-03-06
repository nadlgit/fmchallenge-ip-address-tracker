import { useIpLocation } from './use-ip-location';
import 'whatwg-fetch';
import { server, testData, DEFAULT_DATA } from 'test-mocks/internal-iplocation-api';
import { renderHook, waitFor } from '@testing-library/react';
import { handleOwnIp } from 'utils/helpers';

jest.mock('utils/helpers');
handleOwnIp.mockImplementation(async (ip) => Promise.resolve(ip));

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('useIpLocation() hook', () => {
  it.each(['1.2.3.4', ''])('should call handleOwnIp() with received IP "%s"', async (ip) => {
    const { result } = renderHook(() => useIpLocation(ip));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(handleOwnIp).toHaveBeenLastCalledWith(ip);
  });

  it('should return default data when no IP provided', async () => {
    const { result } = renderHook(() => useIpLocation());
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(DEFAULT_DATA);
  });

  it.each(testData)('should return data for IP "$ip"', async (val) => {
    const { result } = renderHook(() => useIpLocation(val.ip));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(val);
  });

  it('should return error when API error', async () => {
    const testIp = '1.2.3.4';
    expect(testData.map((item) => item.ip)).not.toContain(testIp);
    const { result } = renderHook(() => useIpLocation(testIp));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.data).toEqual({});
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toMatch(/unexpected api error\W/i);
    expect(result.current.error.message).toMatch(/\W404\s/i);
    expect(result.current.error.message).toMatch(/\Wnot found\W/i);
    expect(result.current.error.message).toContain(testIp);
  });
  it('should reset states between API calls', async () => {
    const errorIp = '1.2.3.4';
    expect(testData.map((item) => item.ip)).not.toContain(errorIp);

    const { result, rerender } = renderHook(({ ip = errorIp } = {}) => useIpLocation(ip));
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.data).toEqual({});

    rerender({ ip: testData[0].ip });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(testData[0]);

    rerender({ ip: errorIp });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({});
  });
});
