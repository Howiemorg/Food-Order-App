import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        requestConfig.url,
        requestConfig.method && {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body),
        }
      );

      if (!response.ok) {
        throw new Error("Bad Request");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
        console.log(err.message)
      setError(err.message || "Something went wrong!");
    }

    setIsLoading(true);
  }, []);

  return {
    loading: isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
