import { test, expect } from "@playwright/test";
import { exec } from "../src/core/executor/connectQA-executor";

test("has title", async ({ page }) => {
  await exec(page, expect);
});

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
