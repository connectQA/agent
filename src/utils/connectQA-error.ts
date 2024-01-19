import { ErrorParams } from "../types/error.js";

export class ConnectQAError extends Error {
  constructor(public error: ErrorParams, message?: string) {
    super(error.code + (message ? `: ${message}` : ""));
  }
}
