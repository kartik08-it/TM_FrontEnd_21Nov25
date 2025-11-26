// src/utils/localAuth.ts
const KEY = "tm_auth_v1";

export const getAuthState = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setAuthState = (payload: any) => {
  localStorage.setItem(KEY, JSON.stringify(payload));
};
