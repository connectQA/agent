import fs from "fs";

export function tmpPathExistsOrCreate(): void {
  const _dir = "tmp";
  if (!fs.existsSync(_dir)) {
    fs.mkdirSync(_dir);
  }
}
