export interface Worker {
  executeCode(type: any): Promise<unknown>;
  writeCodeToTargetFile(code: any): any;
}
