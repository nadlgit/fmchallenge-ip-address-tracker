export const composeResult = (json) => {
  const location = (
    json?.location?.city +
    (json?.location?.city && json?.location?.region ? ', ' : '') +
    json?.location?.region +
    ` ${json?.location?.postalCode}`
  ).trim();

  return {
    ip: json?.ip,
    location,
    timezone: json?.location?.timezone,
    isp: json?.isp,
    latitude: json?.location?.lat,
    longitude: json?.location?.lng,
  };
};
