import multer from "multer";
import { exec, ExecException } from "child_process";

export class ConnectQAWorker {
  public fileHandler(): multer.Multer {
    return multer({ storage: this.getStorage() });
  }

  public async executeCode(): Promise<any> {
    return new Promise((resolve, reject) => {
      exec("npm run exec", (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  private getStorage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "tmp/");
      },
      filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName);
      },
    });
  }
}
