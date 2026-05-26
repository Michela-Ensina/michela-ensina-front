import { env } from "@/lib/config/env";
import { ApiClientError, getApiErrorMessage } from "@/lib/api/errors";
import type { ApiEnvelope, RequestOptions } from "@/lib/api/types";

function buildUrl(path: string): string {
  const sanitizedBase = env.apiUrl.replace(/\/$/, "");
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${sanitizedBase}${sanitizedPath}`;
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { raw: text } : null;
}

export async function apiRequest<TData, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TData> {
  const { method = "GET", body, headers, token, signal } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");

  const hasBody = body !== undefined;
  if (hasBody) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
    signal,
  });

  const parsed = (await parseResponse(response)) as ApiEnvelope<TData> | unknown;

  if (!response.ok) {
    const payload = (parsed ?? undefined) as ApiEnvelope<TData> | undefined;
    const errorPayload =
      payload && typeof payload === "object" && "error" in payload ? payload.error : undefined;

    throw new ApiClientError({
      status: response.status,
      message: getApiErrorMessage(response.status, errorPayload),
      code: errorPayload?.code,
      fields: errorPayload?.fields,
      payload: parsed,
    });
  }

  if (
    parsed &&
    typeof parsed === "object" &&
    "success" in parsed &&
    parsed.success === true &&
    "data" in parsed
  ) {
    return parsed.data as TData;
  }

  // TODO: confirmar com Marco se todo endpoint retornará envelope { success, data }.
  return parsed as TData;
}

export function apiGet<TData>(path: string, options?: Omit<RequestOptions, "method" | "body">) {
  return apiRequest<TData>(path, { ...options, method: "GET" });
}

export function apiPost<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options?: Omit<RequestOptions<TBody>, "method" | "body">,
) {
  return apiRequest<TData, TBody>(path, { ...options, method: "POST", body });
}

export function apiPut<TData, TBody = unknown>(
  path: string,
  body?: TBody,
  options?: Omit<RequestOptions<TBody>, "method" | "body">,
) {
  return apiRequest<TData, TBody>(path, { ...options, method: "PUT", body });
}

export function apiDelete<TData>(
  path: string,
  options?: Omit<RequestOptions, "method" | "body">,
) {
  return apiRequest<TData>(path, { ...options, method: "DELETE" });
}
