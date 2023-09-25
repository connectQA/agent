import localtunnel from "localtunnel";
import { ConnectQATunnel, TunnelResponse } from "../types/tunnel.js";
import { Log } from "../utils/logger.js";

const _logger: Log = new Log();

export class Tunnel implements ConnectQATunnel {
  private readonly _port: number;

  constructor(port = "3000") {
    _logger.clear();
    this._port = parseInt(port);
    _logger.info("Generating a connection with connectQA server...", false);
  }

  public async createTunnel(): Promise<TunnelResponse> {
    const tunnel: localtunnel.Tunnel = await localtunnel({
      port: this._port,
    });
    tunnel.on("error", async (err) => {
      _logger.error(`${err}`);
      _logger.error(`Reconnecting...`);
      this.retry();
    });
    tunnel.on("close", (info) => {
      _logger.info(`${info}`, true);
    });
    return {
      url: tunnel.url,
    };
  }

  public closeTunnel(tunnel: localtunnel.Tunnel): void {
    tunnel.close();
  }

  private async retry(): Promise<void> {
    await runInstance(this);
  }
}

export async function runInstance(tunnel: Tunnel): Promise<void> {
  const { url } = await tunnel.createTunnel();
  _logger.info("Connection created successfully.", true);
  console.log(url);
}
