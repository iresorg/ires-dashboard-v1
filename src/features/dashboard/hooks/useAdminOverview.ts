import { useCallback, useEffect, useState } from "react";
import {
  getAdminOverview,
  type AdminOverview,
} from "../services/overviewService";

export const useAdminOverview = () => {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminOverview();
      setOverview(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load admin overview";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return { overview, isLoading, error, refetch: fetchOverview };
};
