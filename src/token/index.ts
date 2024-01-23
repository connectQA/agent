import Conf from "conf";

export class Token {
  private readonly _conf: Conf;

  constructor() {
    this._conf = new Conf({ projectName: "ConnectQA" });
  }

  public isTokenDefined() {
    return {
      accountId: this._conf.get("accountId", null),
      key: this._conf.get("token", null),
    };
  }

  public setData(accountId: string, token: string): boolean {
    try {
      this._conf.set("accountId", accountId);
      this._conf.set("token", token);
      return true;
    } catch {
      return false;
    }
  }

  public deleteData(): void {
    this._conf.delete("accountId");
    this._conf.delete("token");
  }

  public get token() {
    return this._conf.get("token");
  }

  public get accountId() {
    return this._conf.get("accountId");
  }
}
