import { composeResult } from './compose-result';

export const fetchLocation = async (ip) => {
  const url =
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}` +
    (ip ? `&ip=${ip}` : '');
  const response = await fetch(url);
  const json = await response.json();
  return response.ok
    ? { httpCode: 200, payload: composeResult(json) }
    : { httpCode: response.status, payload: { errorMessage: json?.message } };
};
