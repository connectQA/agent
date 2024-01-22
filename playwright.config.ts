import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tmp/",
  outputDir: "./out/",
  fullyParallel: true,
  retries: 1,
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
