import { Expect, Page } from "@playwright/test";

export class ConnectQAExecutor {
  private readonly _page: Page;
  private readonly _expect: Expect;
  constructor(pagePlaywrightObj: Page, expectPlaywrightObj: Expect) {
    this._page = pagePlaywrightObj;
    this._expect = expectPlaywrightObj;
  }
}

export async function exec(page: Page, expect: Expect) {
  await page.goto("https://playwright.dev/");
  await expect(page).toHaveTitle(/Playwright/);
}
