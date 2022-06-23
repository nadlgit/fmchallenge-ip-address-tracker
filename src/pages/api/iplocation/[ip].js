import { isRealGeoAPIEnabled, fetchLocation } from 'utils/helpers';

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
  if (ip && isRealGeoAPIEnabled()) {
    result = await fetchLocation(ip);
  }

  res.status(result?.httpCode).json(result?.payload ?? {});
}
