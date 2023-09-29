export type ConnectQAAgentResponse = {
  datetime: string;
  result: object;
  logs: string[];
};

export type HostDetails = {
  hostname: string;
  os: string;
};
