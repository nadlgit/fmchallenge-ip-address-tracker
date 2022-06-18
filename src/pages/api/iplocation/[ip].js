export default async function handler(req, res) {
  const { ip } = req.query;

  res.status(200).json({
    ip: '8.8.8.8',
    location: 'Mountain View, California 94043',
    timezone: '-07:00',
    isp: 'Google LLC',
    latitude: 37.40599,
    longitude: -122.078514,
  });
}
