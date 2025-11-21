// Custom hooks for API operations with React Query-like functionality
import { useState, useEffect, useCallback } from 'react';
import { apiClient, Plot, Inquiry } from '@/lib/api-client';

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

// Plots hooks
export function usePlots() {
  return useApi(() => apiClient.getPlots());
}

export function usePlot(id: string) {
  return useApi(() => apiClient.getPlot(id), [id]);
}

// Inquiries hooks  
export function useInquiries() {
  return useApi(() => apiClient.getInquiries());
}

export function useInquiry(id: string) {
  return useApi(() => apiClient.getInquiry(id), [id]);
}

// Mutation hook for create/update/delete operations
export function useMutation<T, U>(
  mutationFn: (variables: U) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (variables: U) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutationFn(variables);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn]);

  return { data, loading, error, mutate };
}

// Authentication hook
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem('isAuthenticated');
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (authStatus === 'true' && token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
        }
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      
      // Store auth data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('authToken', response.session.access_token);
      localStorage.setItem('userData', JSON.stringify(response.session.user));
      
      setIsAuthenticated(true);
      setUser(response.session.user);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userName');
    
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };
}
