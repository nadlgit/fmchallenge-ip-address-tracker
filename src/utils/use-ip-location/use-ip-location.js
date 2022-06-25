import { useState, useEffect } from 'react';
import { handleOwnIp } from 'utils/helpers';

export const useIpLocation = (searchIp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setData({});
    handleOwnIp(searchIp)
      .then((ip) => fetch(`/api/iplocation/${ip ?? ''}`))
      .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            let error = `Unexpected API error ${response.status} ${response.statusText}.`;
            if (json?.errorMessage) {
              error += ` Message: ${json?.errorMessage}`;
            }
            return Promise.reject(new Error(error));
          }
          return json;
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
