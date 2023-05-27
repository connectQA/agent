export interface ConnectQALogger {
  error(msg: string): void;
  info(msg: string): void;
  clear(): void;
}
