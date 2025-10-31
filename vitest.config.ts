import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    projects: [
      {
        define: {
          "process.env.FOO": JSON.stringify("BAR"),
        },
        test: {
          name: "node",
          include: ["src/test.ts"],
        },
      },
      {
        define: {
          "process.env.FOO": JSON.stringify("BAR"),
        },
        test: {
          name: "browser",
          include: ["src/test.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            screenshotFailures: false,
          },
        },
      },
      {
        define: {
          "process.FOO.FOO": JSON.stringify("BAR"),
        },
        test: {
          name: "browser2",
          include: ["src/test2.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            screenshotFailures: false,
          },
        },
      },
    ],
  },
});
