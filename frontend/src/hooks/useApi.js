import { useState, useCallback } from "react";
import { handleError } from "../utils";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (apiCall, options = {}) => {
    const {
      onSuccess,
      onError,
      resetError = true,
      resetData = false,
    } = options;

    try {
      setLoading(true);
      if (resetError) setError(null);
      if (resetData) setData(null);

      const result = await apiCall();
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      const errorMessage = handleError(err);
      setError(errorMessage);

      if (onError) {
        onError(err, errorMessage);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    execute,
    reset,
    setError,
    setData,
  };
};
