import localtunnel from "localtunnel";

export class Tunnel {
  private readonly _port: number;

  constructor(port: number = 3000) {
    this._port = port;
  }

  public async createTunnel(): Promise<localtunnel.Tunnel> {
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
    return tunnel;
  }
}
