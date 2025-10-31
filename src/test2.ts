import { expect, test } from "vitest";

test("process.FOO.FOO", () => {
  expect(process.FOO.FOO).toBe("BAR");
});
