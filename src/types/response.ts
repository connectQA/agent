export type ConnectQAAgentResponse = {
  id: string;
  datetime: string;
  result: object;
  logs: string[];
};

export type HostDetails = {
  hostname: string;
  os: string;
};
