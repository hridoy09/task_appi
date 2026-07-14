"use client";

import { useCallback, useEffect, useState } from "react";

import { getApi } from "@/lib/api";

export default function useFeedList() {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadFeeds() {
      try {
        const data = await getApi("FEEDS_INDEX");
        if (ignore) return;
        setFeeds(data?.feeds?.data || []);
        setError("");
      } catch (fetchError) {
        if (ignore) return;
        setError(fetchError.message || "Failed to load feed");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadFeeds();

    return () => {
      ignore = true;
    };
  }, [reloadIndex]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setReloadIndex((value) => value + 1);
  }, []);

  return { feeds, isLoading, error, refetch };
}
