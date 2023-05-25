import { Tunnel } from "../tunnel/tunnel-ssh";

export async function runInstance(tunnel: Tunnel): Promise<void> {
  const { url } = await tunnel.createTunnel();
  console.log(url);
  // await db.createAgent(url);
}
