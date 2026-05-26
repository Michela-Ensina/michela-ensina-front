export type ApiSuccessResponse<TData> = {
  success: true;
  data: TData;
};

export type ApiErrorPayload = {
  code?: string;
  message?: string;
  fields?: Record<string, string[]>;
};

export type ApiErrorResponse = {
  success: false;
  error?: ApiErrorPayload;
};

export type ApiEnvelope<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type RequestOptions<TBody = unknown> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  token?: string;
  signal?: AbortSignal;
};
