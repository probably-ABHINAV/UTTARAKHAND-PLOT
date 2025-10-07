// API Client for backend communication
const getApiBaseUrl = () => {
  // Use environment variable if set, otherwise default to localhost
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }
  
  // Server-side
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('authToken') 
      : null;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
      // Add timeout and error handling
      signal: AbortSignal.timeout(30000), // 30 second timeout
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          error: `HTTP ${response.status}: ${response.statusText}` 
        }));
        throw new Error(errorData.error || `Request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', {
        url,
        error: error instanceof Error ? error.message : 'Unknown error',
        baseURL: this.baseURL
      });
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - please check your connection');
        }
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Cannot connect to server - please check if backend is running');
        }
      }
      
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; services: any }>('/health');
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request<{ session: any; message: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Plots API
  async getPlots() {
    return this.request<{ plots: any[] }>('/api/plots');
  }

  async getPlot(id: string) {
    return this.request<{ plot: any }>(`/api/plots/${id}`);
  }

  async createPlot(plotData: any) {
    return this.request<{ plot: any }>('/api/plots', {
      method: 'POST',
      body: JSON.stringify(plotData),
    });
  }

  async updatePlot(id: string, plotData: any) {
    return this.request<{ plot: any }>(`/api/plots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(plotData),
    });
  }

  async deletePlot(id: string) {
    return this.request<{ message: string }>(`/api/plots/${id}`, {
      method: 'DELETE',
    });
  }

  // Inquiries API
  async getInquiries() {
    return this.request<{ inquiries: any[] }>('/api/inquiries');
  }

  async getInquiry(id: string) {
    return this.request<{ inquiry: any }>(`/api/inquiries/${id}`);
  }

  async createInquiry(inquiryData: any) {
    return this.request<{ inquiry: any; message: string }>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  }

  async updateInquiry(id: string, inquiryData: any) {
    return this.request<{ inquiry: any }>(`/api/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inquiryData),
    });
  }

  async deleteInquiry(id: string) {
    return this.request<{ message: string }>(`/api/inquiries/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export types for better TypeScript support
export interface Plot {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  price: number;
  size_sqyd: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  plot_images?: { url: string }[];
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'CLOSED';
  plot_id?: number;
  created_at: string;
  plots?: { title: string; location: string };
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
  };
}