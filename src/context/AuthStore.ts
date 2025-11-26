
import { getAuthState as _get, setAuthState as _set } from "../utils/localAuth";

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: { id: string; name: string; email: string } | null;
};

let state: AuthState = _get() || { accessToken: null, refreshToken: null, user: null };

export const getAuthState = () => state;

export const setAuthState = (next: Partial<AuthState>) => {
  state = { ...state, ...next };
  _set(state);
};

export const clearAuth = () => {
  state = { accessToken: null, refreshToken: null, user: null };
  _set(state);
};
