import os from "os";
import { HostDetails } from "../types/response.js";

export function details(): HostDetails {
  return {
    hostname: os.hostname(),
    os: os.platform(),
  };
}
