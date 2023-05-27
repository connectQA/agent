import localtunnel from "localtunnel";
import { ConnectQATunnel, TunnelResponse } from "../types/tunnel";
import { Log } from "../utils/logger";

const _logger: Log = new Log();

export class Tunnel implements ConnectQATunnel {
  private readonly _port: number;

  constructor(port: string = "3000") {
    _logger.clear();
    this._port = parseInt(port);
    _logger.info("Generating a connection with connectQA server...");
  }

  public async createTunnel(): Promise<TunnelResponse> {
    const tunnel: localtunnel.Tunnel = await localtunnel({ port: this._port });
    tunnel.on("request", (info) => {
      _logger.info(`${info}`);
      console.log("executing requests");
    });
    tunnel.on("error", (err) => {
      _logger.error(`${err}`);
      console.log("Connection failed. It can be handled here.");
    });
    tunnel.on("close", (info) => {
      _logger.info(`${info}`);
    });
    return {
      url: tunnel.url,
    };
  }

  public closeTunnel(tunnel: localtunnel.Tunnel): void {
    tunnel.close();
  }
}

export async function runInstance(tunnel: Tunnel): Promise<void> {
  const { url } = await tunnel.createTunnel();
  _logger.info("Connection created successfully.");
  console.log(url);
}
