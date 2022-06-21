import { isRealGeoAPIEnabled } from './is-real-geo-api-enabled';

describe('handleOwnIp()', () => {
  it('should return false when NEXT_PUBLIC_USE_REAL_GEO_API is not set', () => {
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = '';
    expect(isRealGeoAPIEnabled()).toBeFalsy();
  });

  it('should return true when NEXT_PUBLIC_USE_REAL_GEO_API is set', () => {
    process.env.NEXT_PUBLIC_USE_REAL_GEO_API = 'true';
    expect(isRealGeoAPIEnabled()).toBeTruthy();
  });
});
