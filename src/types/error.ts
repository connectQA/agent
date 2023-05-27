export type ErrorParams =
  | InvalidApiKeyError
  | SecretKeyNotFoundError
  | UndefinedServerError
  | FileNotReceivedError;

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

export type FileNotReceivedError = BaseError<ErrorCode.FILE_NOT_RECEIVED, {}>;

export type FileNotSavedError = BaseError<ErrorCode.FILE_NOT_SAVED, {}>;

export enum ErrorCode {
  SECRET_KEY_NOT_FOUND = "Secrey key is required",
  UNDEFINED_SERVER = "The server stablished for Connect QA is undefined.",
  INVALID_API_KEY = "The provided API key was invalid. Make sure this value corresponds to your API key from your profile.",
  FILE_NOT_RECEIVED = "No file received.",
  FILE_NOT_SAVED = "Internal error. The file could not be saved.",
}
