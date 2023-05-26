import { test, expect } from "@playwright/test";
import { exec } from "./connectQA-executor";

test("has title", async ({ page }) => {
  await exec(page, expect);
});
