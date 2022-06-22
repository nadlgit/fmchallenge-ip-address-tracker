export default async function handler(req, res) {
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

  res.status(result?.httpCode).json(result?.payload ?? {});
}
