import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tmp/",
  outputDir: "./out/",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["json", { outputFile: "out/results.json" }]],
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
