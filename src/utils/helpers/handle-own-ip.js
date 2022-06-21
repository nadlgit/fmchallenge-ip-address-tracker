import { isRealGeoAPIEnabled } from './is-real-geo-api-enabled';

export const handleOwnIp = async (searchIp) => {
  let ip = searchIp ?? '';
  if (!ip && isRealGeoAPIEnabled()) {
    const response = await fetch('https://api.ipify.org/');
    if (response.ok) {
      ip = await response.text();
    }
  }
  return ip;
};
