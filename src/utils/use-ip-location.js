import { useState, useEffect } from 'react';

export const useIpLocation = (ip) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`/api/iplocation/${ip ?? ''}`)
      .then((data) => {
        return data.json();
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
