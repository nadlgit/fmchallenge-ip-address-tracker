export default function handler(req, res) {
  res.status(200).json({
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: '-05:00',
    isp: 'SpaceX Starlink',
    latitude: 40.65,
    longitude: -73.95,
  });
}
