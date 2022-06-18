import { useState, useEffect } from 'react';

export const useIpLocation = (ip) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`/api/iplocation/${ip ?? ''}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(
            new Error(`Unexpected API error ${response.status} ${response.statusText}.`)
          );
        }
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [ip]);
  return { isLoading, error, data };
};
