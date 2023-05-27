import multer from "multer";

export interface Worker {
  fileHandler(): multer.Multer;
  executeCode(): Promise<any>;
}
