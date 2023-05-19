/**
 * A method to build unique identifiers.
 * @returns UUID string.
 */
export default function uuid(): string {
  return ("" + 1e7 + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
