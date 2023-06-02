export interface ConnectQALogger {
  error(msg: string): void;
  info(msg: string, save: boolean): void;
  clear(): void;
}
