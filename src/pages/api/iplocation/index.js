import requestIp from 'request-ip';

const getClientIP = async () => {
  const response = await fetch('https://api.ipify.org/');
  if (!response.ok) {
    return null;
  }
  const ip = await response.text();
  return ip;
};

const isLocalhostIP = (ip) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);

export default async function handler(req, res) {
  let ip = requestIp.getClientIp(req);
  if (!ip || isLocalhostIP(ip)) {
    ip = await getClientIP();
  }

  res.status(200).json({
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: '-05:00',
    isp: 'SpaceX Starlink',
    latitude: 40.65,
    longitude: -73.95,
  });
}
