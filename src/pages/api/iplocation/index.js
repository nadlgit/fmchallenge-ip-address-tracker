import { fetchLocation } from 'services/geo-ipify-api';

export default async function handler(req, res) {
  let ip = '';
  const response = await fetch('https://api.ipify.org/');
  if (response.ok) {
    ip = await response.text();
  }

  let result = {
    httpCode: 200,
    payload: {
      ip: '192.212.174.101',
      location: 'Brooklyn, NY 10001',
      timezone: '-05:00',
      isp: 'SpaceX Starlink',
      latitude: 43.732,
      longitude: 7.415,
    },
  };
  if (process.env.NODE_ENV === 'production' || process.env.USE_REAL_GEO_API) {
    result = await fetchLocation(ip ?? '');
  }

  res.status(result?.httpCode).json(result?.payload);
}
