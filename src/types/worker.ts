import multer from "multer";

export interface Worker {
  fileHandler(): multer.Multer;
  executeCode(type: any): Promise<unknown>;
}
