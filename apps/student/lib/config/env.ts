const API_URL_FALLBACK = "http://localhost:8000/api";

const envApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const env = {
  apiUrl: envApiUrl && envApiUrl.length > 0 ? envApiUrl : API_URL_FALLBACK,
  hasExplicitApiUrl: Boolean(envApiUrl && envApiUrl.length > 0),
};
