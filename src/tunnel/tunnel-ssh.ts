import localtunnel from "localtunnel";
import { TunnelResponse } from "../types/tunnel";

export class Tunnel {
  private readonly _port: number;
  constructor(port: string = "3000") {
    this._port = parseInt(port);
  }

  public async createTunnel(): Promise<TunnelResponse> {
    const tunnel: localtunnel.Tunnel = await localtunnel({ port: this._port });
    tunnel.on("request", (info) => {
      console.log(info);
    });
    tunnel.on("error", (err) => {
      console.log(err);
    });
    tunnel.on("close", () => {
      console.warn("Tunnel closed.");
    });
    return {
      url: tunnel.url,
      port: this._port,
    };
  }
}
