export interface ConnectQAReport {
  processPlaywrightReport(): Result;
  send(): Promise<boolean>;
}

export type Result = {
  id: string;
  result: string;
};
