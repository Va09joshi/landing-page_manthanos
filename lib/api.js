const DEFAULT_API_BASE_URL = "http://localhost:5000/api";

function normalizeApiBaseUrl(value) {
  const baseUrl = (value || DEFAULT_API_BASE_URL).replace(/\/$/, "");
  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

export const API_BASE_URL = normalizeApiBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL
);

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
    cache: options.cache || "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || payload.error || "Something went wrong");
  return payload.data ?? payload;
}

export const api = {
  health: () => request("/health"),
  posts: () => request("/blog/public"),
  post: (slug) => request(`/blog/public/${encodeURIComponent(slug)}`),
  lead: (data) => request("/leads", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  applyForWorkspace: (data) => request("/public/workspace-applications", { method: "POST", body: JSON.stringify(data) }),
  acceptInvite: (data) => request("/auth/accept-invite", { method: "POST", body: JSON.stringify(data) }),
  me: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
};
