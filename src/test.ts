import { expect, test } from "vitest";

test("process.env.FOO", () => {
  expect(process.env.FOO).toBe("BAR");
});
