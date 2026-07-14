const ENDPOINTS = {
  LOGIN: "/api/user/auth/login",
  LOGOUT: "/api/user/auth/logout",
  REGISTER: "/api/user/auth/register",

  FEEDS_INDEX: "/api/user/feeds",
  FEEDS_STORE: "/api/user/feeds/store",
  FEEDS_SHOW: (id) => `/api/user/feeds/show/${id}`,
  FEEDS_UPDATE: (id) => `/api/user/feeds/detail/${id}`,
  FEEDS_DESTROY: (id) => `/api/user/feeds/destroy/${id}`,
  FEEDS_LIKE: (id) => `/api/user/feeds/like/${id}`,
  FEEDS_UNLIKE: (id) => `/api/user/feeds/unlike/${id}`,
};

const ROUTES = {
  HOME: "/feed",
  LOGIN: "/login",
  REGISTER: "/register",
};

const AUTH_COOKIE_NAME = "token";
const AUTH_USER = "user";
const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];
const PROTECTED_ROUTES = [ROUTES.HOME];

export {
  AUTH_COOKIE_NAME,
  AUTH_ROUTES,
  AUTH_USER,
  ENDPOINTS,
  PROTECTED_ROUTES,
  ROUTES,
};

export default ENDPOINTS;
