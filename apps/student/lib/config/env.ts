const API_URL_FALLBACK = "http://localhost:8000";

const envApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

function normalizeApiUrl(value: string) {
  const withoutTrailingSlash = value.replace(/\/+$/, "");

  return withoutTrailingSlash.endsWith("/api")
    ? withoutTrailingSlash.slice(0, -4)
    : withoutTrailingSlash;
}

export const env = {
  apiUrl: normalizeApiUrl(
    envApiUrl && envApiUrl.length > 0 ? envApiUrl : API_URL_FALLBACK,
  ),
  hasExplicitApiUrl: Boolean(envApiUrl && envApiUrl.length > 0),
};
