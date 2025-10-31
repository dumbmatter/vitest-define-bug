import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
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
});
