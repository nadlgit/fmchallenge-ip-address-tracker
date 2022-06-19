import { composeResult } from './compose-result';

export const fetchLocation = async (ip) => {
  const url =
    `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_IPIFY_API_KEY}` +
    (ip ? `&ipAddress=${ip}` : '');
  const response = await fetch(url);
  const json = await response.json();
  return response.ok
    ? { httpCode: 200, payload: composeResult(json) }
    : { httpCode: response.status, payload: { errorMessage: json?.messages } };
};
