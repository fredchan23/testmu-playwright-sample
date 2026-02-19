// playwright.config.ts
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import cp from "child_process";

// Load environment variables from .env file
dotenv.config();
const isLocal = process.env.LOCAL === "true";
const playwrightClientVersion = cp
  .execSync("npx playwright --version")
  .toString()
  .trim()
  .split(" ")[1];

export default defineConfig({
  use: {
    ...(isLocal
      ? { headless: false }
      : {
          connectOptions: {
            wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
              JSON.stringify({
                browserName: "Chrome",
                browserVersion: "latest",
                "LT:Options": {
                  platform: "Windows 10",
                  user: process.env.LT_USERNAME,
                  accessKey: process.env.LT_ACCESS_KEY,
                  network: true,
                  video: true,
                  console: true,
                  playwrightClientVersion: playwrightClientVersion,
                },
              }),
            )}`,
          },
        }),
  },
});