import { useState, useEffect } from 'react';

export const useIpLocation = (ip) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`/api/iplocation/${ip ?? ''}`)
      .then((response) =>
        response
          .json()
          .then((json) =>
            response.ok
              ? json
              : Promise.reject(
                  new Error(
                    `Unexpected API error ${response.status} ${response.statusText}.` +
                      ` Reason: ${json?.errorMessage}`
                  )
                )
          )
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
  }, [ip]);
  return { isLoading, error, data };
};
