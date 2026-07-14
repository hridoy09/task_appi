import ENDPOINTS, {
  AUTH_COOKIE_NAME,
  AUTH_USER,
} from "./endpoint";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getCookie(name) {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
}

function getAuthToken() {
  return getCookie(AUTH_COOKIE_NAME);
}

function getAuthUser() {
  const user = getCookie(AUTH_USER);
  if (!user) return null;
  try {
    return JSON.parse(user) ?? null;
  } catch {
    return null;
  }
}

function getApiEndpoint(key, params) {
  const endpoint = ENDPOINTS[key];

  if (!endpoint) {
    throw new Error(`Unknown API endpoint: ${key}`);
  }

  return typeof endpoint === "function" ? endpoint(params) : endpoint;
}

function getApiUrl(key, params) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  return `${API_URL.replace(/\/$/, "")}${getApiEndpoint(key, params)}`;
}

async function apiRequest(key, { params, ...options } = {}) {
  const isFormData = options.body instanceof FormData;
  const token = getAuthToken();

  const response = await fetch(getApiUrl(key, params), {
    headers: {
      Accept: "application/json",
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }

  return data;
}

function getApi(key, options = {}) {
  return apiRequest(key, {
    ...options,
    method: "GET",
  });
}

function postApi(key, body, options = {}) {
  const isFormData = body instanceof FormData;

  return apiRequest(key, {
    ...options,
    method: "POST",
    body: isFormData ? body : JSON.stringify(body),
  });
}

function deleteApi(key, options = {}) {
  return apiRequest(key, {
    ...options,
    method: "DELETE",
  });
}

function getMediaUrl(path) {
  if (!path) return null;
  if (!API_URL) return path;

  return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export {
  apiRequest,
  API_URL,
  deleteApi,
  ENDPOINTS,
  getApi,
  getApiEndpoint,
  getApiUrl,
  getAuthUser,
  getMediaUrl,
  postApi,
};
