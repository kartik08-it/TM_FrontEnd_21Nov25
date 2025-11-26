import axios from "axios";

import { AUTH_ROUTES } from "../constants/apiRoutes";
import { getAuthState, setAuthState } from "../context/AuthStore";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: { "Content-Type": "application/json" },
});

// attach token
instance.interceptors.request.use((config) => {
  const auth = getAuthState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

// refresh token logic
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const auth = getAuthState();

      const { data } = await axios.post(AUTH_ROUTES.REFRESH, {
        refresh_token: auth.refreshToken,
      });

      setAuthState({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });

      original.headers.Authorization = `Bearer ${data.access_token}`;
      return instance(original);
    }

    return Promise.reject(err);
  }
);

export default instance;
