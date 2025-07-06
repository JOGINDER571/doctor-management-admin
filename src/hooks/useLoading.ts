import React, { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);
  return {
    loading,
    showLoader,
    hideLoader,
  };
};

export default useLoading;
