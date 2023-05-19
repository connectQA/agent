export type TunnelProps = {
  tunnelOptions: TunnelOptions;
  serverOptions: ServerOptions;
  sshOptions: SSHOptions;
  forwardsOptions: ForwardOptions;
};

export type TunnelOptions = {
  autoClose: boolean;
};

export type ServerOptions = {
  host: string;
  port: number;
};

export type SSHOptions = ServerOptions & {
  username: string;
  password: string;
};

export type ForwardOptions = {
  srcAddr: string;
  srcPort: number;
  dstAddr: string;
  dstPort: number;
};
