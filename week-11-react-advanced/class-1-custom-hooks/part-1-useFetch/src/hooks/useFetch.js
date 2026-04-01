import { useState, useEffect } from "react";

export function useFetch(url) {
  const [finalData, setFinalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getDetails() {
    setIsLoading(true);
    const response = await fetch(url);
    const json = await response.json();
    setFinalData(json);
    setIsLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, [url]);

  return { finalData, isLoading };
}
