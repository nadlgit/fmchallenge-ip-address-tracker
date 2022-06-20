import { useState, useEffect } from 'react';

const handleOwnIp = async (searchIp) => {
  let ip = searchIp;
  if (
    !searchIp &&
    (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_REAL_GEO_API)
  ) {
    const response = await fetch('https://api.ipify.org/');
    if (response.ok) {
      ip = await response.text();
    }
  }
  return ip;
};

export const useIpLocation = (searchIp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    handleOwnIp(searchIp)
      .then((ip) => fetch(`/api/iplocation/${ip ?? ''}`))
      .then((response) =>
        response.json().then((json) => {
          let error = `Unexpected API error ${response.status} ${response.statusText}.`;
          if (json?.errorMessage) {
            error += ` Message: ${json?.errorMessage}`;
          }
          return response.ok ? json : Promise.reject(new Error(error));
        })
      )
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchIp]);
  return { isLoading, error, data };
};
