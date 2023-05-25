import localtunnel from "localtunnel";
import { TunnelResponse } from "../types/tunnel";
import { Log } from "../utils/logger";

export class Tunnel {
  private readonly _port: number;
  private readonly _logger: Log = new Log();

  constructor(port: string = "3000") {
    this._port = parseInt(port);
    this._logger.info("Generating a connection with connectQA server...");
  }

  public async createTunnel(): Promise<TunnelResponse> {
    const tunnel: localtunnel.Tunnel = await localtunnel({ port: this._port });
    tunnel.on("request", (info) => {
      this._logger.info(`${info}`);
    });
    tunnel.on("error", (err) => {
      this._logger.error(`${err}`);
    });
    tunnel.on("close", (info) => {
      this._logger.info(`${info}`);
    });
    return {
      url: tunnel.url,
    };
  }

  public closeTunnel(tunnel: localtunnel.Tunnel) {
    return tunnel.close();
  }
}
