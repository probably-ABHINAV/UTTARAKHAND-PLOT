import { useState, useEffect, useCallback } from "react";
import { plots } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Plot = InferSelectModel<typeof plots>;

export function usePlots() {
  const [data, setData] = useState<{ plots: Plot[] }>({ plots: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlots = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/plots");
      if (!res.ok) throw new Error("Failed to fetch plots");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlots();
  }, [fetchPlots]);

  return { data, loading, error, refetch: fetchPlots };
}

export function useInquiries() {
  const [data, setData] = useState({ inquiries: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/inquiries");
      if (!res.ok) throw new Error("Failed to fetch inquiries");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  return { data, loading, error, refetch: fetchInquiries };
}

export function usePosts() {
  const [data, setData] = useState({ posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts?admin=true");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { data, loading, error, refetch: fetchPosts };
}

export function useLocations() {
  const [data, setData] = useState<{ locations: any[] }>({ locations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/locations");
      if (!res.ok) throw new Error("Failed to fetch locations");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { data, loading, error, refetch: fetchLocations };
}

export function useUsers(query?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      const q = query ? `?q=${query}` : ""
      const res = await fetch(`/api/users${q}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const json = await res.json()
      setData(json)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [query])

  return { data, loading, error, refetch: fetchData }
}

export function useMutation() {
  // Basic mutation helper
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mutate = async (url: string, method: string, body: any) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
}

import { useUser } from "@stackframe/stack";

export function useAuth() {
  const user = useUser();
  return { user, isSignedIn: !!user };
}