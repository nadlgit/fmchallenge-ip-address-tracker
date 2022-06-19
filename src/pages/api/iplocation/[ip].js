import { fetchLocation } from 'services/geo-ipify-api';

export default async function handler(req, res) {
  const { ip } = req.query;

  let result = {
    httpCode: 200,
    payload: {
      ip: ip ?? '8.8.8.8',
      location: 'Mountain View, California 94043',
      timezone: '-07:00',
      isp: 'Google LLC',
      latitude: 37.40599,
      longitude: -122.078514,
    },
  };
  if (process.env.NODE_ENV === 'production' || process.env.USE_REAL_GEO_API) {
    result = await fetchLocation(ip ?? '');
  }

  res.status(result?.httpCode).json(result?.payload);
}
