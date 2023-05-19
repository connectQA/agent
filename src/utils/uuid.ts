import { v4 as uuidv4 } from "uuid";

/**
 * A method to build unique identifiers.
 * @returns UUID string.
 */
export function uuid(): string {
  return uuidv4();
}
