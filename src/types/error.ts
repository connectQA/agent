export type ErrorParams =
  | InvalidApiKeyError
  | SecretKeyNotFoundError
  | UndefinedAPIKeyError
  | FileNotReceivedError
  | FileNotFoundError
  | UnknownError
  | TunnelCreationError;

export interface BaseError<T, V> {
  code: T;
  params: V;
}

export type InvalidApiKeyError = BaseError<
  ErrorCode.INVALID_API_KEY,
  { accountId: string | undefined; token: string | undefined }
>;

export type SecretKeyNotFoundError = BaseError<
  ErrorCode.SECRET_KEY_NOT_FOUND,
  { secretKey: string | undefined }
>;

export type UndefinedAPIKeyError = BaseError<
  ErrorCode.UNDEFINED_API_KEY,
  { apiKey: string | undefined }
>;

export type FileNotFoundError = BaseError<
  ErrorCode.FILE_NOT_FOUND,
  {
    dir: string;
  }
>;

export type UnknownError = BaseError<
  ErrorCode.UNKNOWN_ERROR,
  {
    error: unknown;
  }
>;

export type TunnelCreationError = BaseError<
  ErrorCode.TUNNEL_CREATION_ERROR,
  {
    status: number;
  }
>;

export type FileNotReceivedError = BaseError<ErrorCode.FILE_NOT_RECEIVED, unknown>;

export type FileNotSavedError = BaseError<ErrorCode.FILE_NOT_SAVED, unknown>;

export enum ErrorCode {
  SECRET_KEY_NOT_FOUND = "Secrey key is required",
  UNDEFINED_API_KEY = "API key is undefined.",
  INVALID_API_KEY = "The provided API key was invalid. Make sure this value corresponds to your API key from your profile.",
  FILE_NOT_RECEIVED = "No file received.",
  FILE_NOT_SAVED = "Internal error. The file could not be saved.",
  FILE_NOT_FOUND = "File could not be found for further deletion process.",
  UNKNOWN_ERROR = "Something went wrong.",
  TUNNEL_CREATION_ERROR = "Tunnel register failed.",
}
