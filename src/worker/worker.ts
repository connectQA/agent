import fs from "fs";
import path from "path";
import multer from "multer";
import { exec } from "child_process";
import { Worker } from "../types/worker.js";
import { ConnectQAError } from "../utils/connectQA-error.js";
import { ErrorCode } from "../types/error.js";
import { Log } from "../utils/logger.js";

const _logger = new Log();

export class ConnectQAWorker implements Worker {
  private readonly _dir: string = "tmp";

  public fileHandler(): multer.Multer {
    return multer({ storage: this.getStorage() });
  }

  public async executeCode(type: any): Promise<boolean> {
    _logger.info("Executing tests...", true);
    return new Promise((resolve, reject) => {
      exec(`npm run ${type == "headed" ? "exec-headed" : "exec"}`, (error) => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
          this.removeFileAfterExecution();
        }
      });
    });
  }

  private getStorage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${this._dir}/`);
      },
      filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
      },
    });
  }

  private removeFileAfterExecution(): void {
    fs.readdir(this._dir, (err, files) => {
      if (err)
        throw new ConnectQAError({
          code: ErrorCode.FILE_NOT_FOUND,
          params: { dir: this._dir },
        });
      for (const file of files) {
        fs.unlink(path.join(this._dir, file), (err) => {
          if (err) throw err;
        });
      }
    });
  }
}
