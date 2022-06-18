export default function handler(req, res) {
  const { ip } = req.query;
  const tmpRes = ip
    ? {
        ip: '8.8.8.8',
        location: 'Mountain View, California 94043',
        timezone: '-07:00',
        isp: 'Google LLC',
        latitude: 37.40599,
        longitude: -122.078514,
      }
    : {
        ip: '192.212.174.101',
        location: 'Brooklyn, NY 10001',
        timezone: '-05:00',
        isp: 'SpaceX Starlink',
        latitude: 40.65,
        longitude: -73.95,
      };
  res.status(200).json(tmpRes);
}
