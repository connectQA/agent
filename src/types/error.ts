export type ErrorParams =
  | InvalidApiKeyError
  | FileNotReceivedError
  | UnknownError
  | FailedExecutionError
  | WritingCodeError
  | TunnelCreationError;

export interface BaseError<T, V> {
  code: T;
  params: V;
}

export type InvalidApiKeyError = BaseError<
  ErrorCode.INVALID_API_KEY,
  { accountId: string | undefined; token: string | undefined }
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

export type FileNotReceivedError = BaseError<
  ErrorCode.INSTRUCTIONS_NOT_FOUND,
  unknown
>;

export type FailedExecutionError = BaseError<
  ErrorCode.FAILED_TEST_EXECUTION,
  {
    error: unknown;
  }
>;

export type WritingCodeError = BaseError<
  ErrorCode.WRITING_CODE_ERROR,
  {
    error: unknown;
  }
>;

export enum ErrorCode {
  INVALID_API_KEY = "The provided API key was invalid. Make sure this value corresponds to your API key from your profile.",
  INSTRUCTIONS_NOT_FOUND = "The ConnectQA agent did not receive any instructions to follow.",
  WRITING_CODE_ERROR = "Instructions could not be written into target file.",
  FAILED_TEST_EXECUTION = "Something went wrong while executing test.",
  TUNNEL_CREATION_ERROR = "Tunnel register failed.",
  UNKNOWN_ERROR = "Something went wrong.",
}
