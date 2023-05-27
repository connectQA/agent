import fs from "fs";

export function pathExistsOrCreate(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
