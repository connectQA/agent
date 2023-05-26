export interface HTTPHandler {
  validateApiKey(): Promise<boolean>;
}
