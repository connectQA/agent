import { ErrorParams } from "../types/error";

export class ConnectQAError extends Error {
  constructor(public error: ErrorParams, message?: string) {
    super(error.code + (message ? `: ${message}` : ""));
  }
}
