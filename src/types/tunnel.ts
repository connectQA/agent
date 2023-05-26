import localtunnel from "localtunnel";

export interface ConnectQATunnel {
  createTunnel(): Promise<TunnelResponse>;
  closeTunnel(tunnel: localtunnel.Tunnel): void;
}

export type TunnelResponse = {
  url: string;
};
