/* The API host must be configured per environment.

   This previously defaulted to http://localhost:5000/api, so a production build
   with no NEXT_PUBLIC_API_BASE_URL set would quietly point every form, login and
   blog request at the visitor's own machine. Failing loudly beats failing
   silently inside someone's browser. */
const DEFAULT_API_BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000/api";

function normalizeApiBaseUrl(value) {
  const baseUrl = (value || DEFAULT_API_BASE_URL).replace(/\/$/, "");
  if (!baseUrl) return "";
  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

export const API_BASE_URL = normalizeApiBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL
);

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("The API is not configured for this deployment.");
  }
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
  applyForWorkspace: async (data) => {
    const response = await fetch("/api/workspace-applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.message || payload.error || "The workspace application could not be submitted.");
    }
    return payload.data ?? payload;
  },
  acceptInvite: (data) => request("/auth/accept-invite", { method: "POST", body: JSON.stringify(data) }),
  me: (token) => request("/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
};
