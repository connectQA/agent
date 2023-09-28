import Conf from "conf";

export class Token {
  private readonly _conf: Conf;

  constructor() {
    this._conf = new Conf({ projectName: "connectQA" });
  }

  public isTokenDefined() {
    return { key: this._conf.get("token", null) };
  }

  public setToken(token: string): boolean {
    try {
      this._conf.set("token", token);
      return true;
    } catch {
      return false;
    }
  }

  public deleteToken(): void {
    this._conf.delete("token");
  }
}
