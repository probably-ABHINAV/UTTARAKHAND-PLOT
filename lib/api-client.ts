// API Client for Next.js (Vercel-compatible)

export interface Plot {
  id: number
  title: string
  slug: string
  description: string
  location: string
  price: number
  size_sqyd: number
  is_published: boolean
  created_at: string
  updated_at: string
  plot_images?: { url: string }[]
}

export interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: "NEW" | "CONTACTED" | "CLOSED"
  plot_id?: number
  created_at: string
  plots?: { title: string; location: string }
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

// ---------- INTERNAL REQUEST ----------
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null

  const res = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const text = await res.text()

  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error("API returned HTML instead of JSON")
  }

  if (!res.ok) {
    throw new Error(data.error || "API request failed")
  }

  return data
}

// ---------- API CLIENT ----------
export const apiClient = {
  // AUTH
  login: (email: string, password: string) =>
    request<{ token: string; admin: any }>("/admin-auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // PLOTS
  getPlots: () => request<{ plots: Plot[] }>("/plots"),
  getPlot: (id: string) => request<{ plot: Plot }>(`/plots/${id}`),
  createPlot: (data: Partial<Plot>) =>
    request("/plots", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updatePlot: (id: string, data: Partial<Plot>) =>
    request(`/plots/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletePlot: (id: string) =>
    request(`/plots/${id}`, { method: "DELETE" }),

  // INQUIRIES
  getInquiries: () => request<{ inquiries: Inquiry[] }>("/inquiries"),
  getInquiry: (id: string) =>
    request<{ inquiry: Inquiry }>(`/inquiries/${id}`),

  // BLOGS
  getBlogs: () => request<{ blogs: BlogPost[] }>("/blogs"),
  getBlog: (id: string) =>
    request<{ blog: BlogPost }>(`/blogs/${id}`),
}
