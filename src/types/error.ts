export type ErrorParams =
  | InvalidApiKeyError
  | SecretKeyNotFoundError
  | UndefinedServerError;

export interface BaseError<T, V> {
  code: T;
  params: V;
}

export type InvalidApiKeyError = BaseError<
  ErrorCode.INVALID_API_KEY,
  { apiKey: string | undefined }
>;

export type SecretKeyNotFoundError = BaseError<
  ErrorCode.SECRET_KEY_NOT_FOUND,
  { secretKey: string | undefined }
>;

export type UndefinedServerError = BaseError<
  ErrorCode.UNDEFINED_SERVER,
  { server: string | undefined }
>;

export enum ErrorCode {
  SECRET_KEY_NOT_FOUND = "Secrey key is required",
  UNDEFINED_SERVER = "The server stablished for Connect QA is undefined.",
  INVALID_API_KEY = "The provided API key was invalid. Make sure this value corresponds to your API key from your profile.",
}
